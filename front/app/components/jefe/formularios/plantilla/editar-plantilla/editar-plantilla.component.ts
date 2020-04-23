import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlantillaService } from './../../../../../services/plantilla.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../../../../services/user.service';
import { GLOBAL } from '../../../../../services/global';
import { ImageService } from '../../../../../services/image.service';
import { OperacionesPlantillasService } from 'src/app/services/operaciones-plantillas.service';
import { AuthService } from '../../../../../services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-editar-plantilla',
  templateUrl: './editar-plantilla.component.html',
  styleUrls: ['./editar-plantilla.component.css']
})
export class JefeEditarPlantillaComponent implements OnInit {

  headerSrc;
  header;
  footerSrc;
  footer;
  firstFooter;
  firstHeader;

  public headerToUpload: Array<File>;
  public footerToUpload: Array<File>;

  url;

  public plantillas:any={};
  private string_template;
  public nombre_plantilla;
  id;

  bloque:any={};
  blocks = [];
  n_blocks = 0;

  options_grupos = [/*"Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4", "Plantilla 5"*/];
  selected_grupos;
  grupos_disponibles: any[] = [];

  public identity: any;
  private empresa: any;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
    private _templateService: PlantillaService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    public opService: OperacionesPlantillasService,
    private _userService: UserService,
    private imageService: ImageService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { 
    this.identity = this.authService.getIdentity();
    this.firstFooter = true;
    this.firstHeader = true;
  }

  ngOnInit() {
    this.url = GLOBAL.url;
    this.empresaService.obtenerNombreEmpresaEmpleado(this.identity.id)
    .then(resp => {
      this.empresa = resp.data[0];

      this.getTemplate();
      this.loadGroups();
      
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  changeGroup( data ) {
    this.selected_grupos = data;
  }

  headerChangeEvent(event: any){
    this.headerToUpload = <Array<File>>event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.header ="nulo";
          this.headerSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    
    }
    
  }

  removeHeader() {
    this.header ="null";
    this.headerSrc = "";
    this.firstHeader = false;
  }
  
  footerChangeEvent(event: any){
    this.footerToUpload = <Array<File>>event.target.files;
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.footer ="nulo";
          this.footerSrc = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    
    }
  }

  removeFooter() {
    this.footer = "null";
    this.footerSrc = "";
    this.firstFooter = false;
  }

  goToBack() {
    this._router.navigate(['/jefe/formularios/ver-plantilla', this.id]);
  }

  getTemplate(){
    var id;

		this._route.params.forEach((params: Params) => {
      let idf = params['id'];

      id = idf;
      this.id = idf;
			
    });
    
    this._templateService.obtener_plantilla(id)
      .then(response => {
        this.plantillas = response.plantillas;

        this.selected_grupos = this.plantillas.id_group;
        this.header = response.plantillas.header;
        this.footer = response.plantillas.footer;

        this.splitTemplate(this.plantillas.name, this.plantillas.template);
       })
       .catch(error => {
        console.log(error);
       });
  }

  loadGroups() {
    const grupos_cargados = this._templateService.obtener_lista_grupos(this.empresa.id);
    const result = Promise.resolve(grupos_cargados);
    result.then( result => {
      this.grupos_disponibles = result.grupos;
      for (var i = 0;  i < result.grupos.length; i++) {
        this.options_grupos.push(result.grupos[i].name);
      }
    });

  }

  splitTemplate(name:string, content:string){
      this.nombre_plantilla = name;

      this.string_template = content;
      
      var elements_block, elements_block, name_block, options, str_options, options_block, array_option, type;
      let total_blocks = content.split("*[*");

      for (let block of total_blocks) {
        elements_block = block.split("**[[**");

        name_block = elements_block[0];
        str_options = elements_block[1];
        options_block = str_options.split("*}{*");

        this.bloque = {};
        this.bloque.name=name_block;
        this.bloque.elements = [];

        for(let option_block of options_block){
          var element:any={};
          element.options = [];

          array_option = option_block.split("-}{-");
          type = array_option[0];
          options = array_option[1];
          element.name = type;
          if(type == "numero" || type == "texto" || type == "archivo" || type == "imagen"){
            element.value = options;
          }
          else if(type == "radio" || type == "lista"){            
            var options_array = options.split("{--}");
            var z = 0;
            for(let opt of options_array){
              element.options.push(opt);
              if(z<options_array.length-1){
                
                z++;
              }
              
            }
            
          }

          this.bloque.elements.push(element);
        }

        this.blocks.push(this.bloque);
      }
  }

  cancelUser(){
    this._router.navigate(['/jefe/formularios']);
  }
  
  /*
   *  Metodos de manipulacion de bloques 
  */

  addBlock(){
    this.bloque = this.initBlock();
    this.blocks.push(this.bloque);
  }

  initBlock(){
    this.n_blocks++; 
    this.bloque={};
    //this.bloque.name="bloque-"+this.n_blocks;
    this.bloque.elements = [];

    return this.bloque;
  }

  removeBlock(bloque_eliminar:any){
    const index: number = this.blocks.indexOf(bloque_eliminar);
    if (index !== -1){
      this.blocks.splice(index, 1);
    }
  }

  /*
   *  Metodos de manipulacion de elementos del bloque 
  */

  addTextField(bloque_editar:any){
    let textfield:any={};
    textfield.name = "texto";
    bloque_editar.elements.push(textfield);
  }

  addNumberField(bloque_editar:any){
    let textfield:any={};
    textfield.name = "numero";
    bloque_editar.elements.push(textfield);
  }

  addUpFile(bloque_editar:any){
    let textfield:any={};
    textfield.name = "archivo";
    bloque_editar.elements.push(textfield);
  }

  addRadioButton(bloque_editar:any){
    let textfield:any={};
    textfield.name = "radio";
    textfield.options = [];
    bloque_editar.elements.push(textfield);
  }

  addList(bloque_editar:any){
    let textfield:any={};
    textfield.name = "lista";
    textfield.options = [];
    bloque_editar.elements.push(textfield);
  }

  addFirmField(bloque_editar:any){
    let firmafield:any={};
    firmafield.name = "firma";
    bloque_editar.elements.push(firmafield);
  }

  addImageField(bloque_editar:any){
    let imagenfield:any={};
    imagenfield.name = "imagen";
    bloque_editar.elements.push(imagenfield);
  }

  removeElement(bloque_seleccionado, elemento_eliminar){
    const index: number = bloque_seleccionado.elements.indexOf(elemento_eliminar);
    if (index !== -1){
      bloque_seleccionado.elements.splice(index, 1);
    }
  }

  /*
  *   Opciones radio button
  */

 public textoRadio;

  addRadioOption(block:any, element:any, newOptionRadio:string){
    //element.options.push("prueba");
    if(newOptionRadio!=""){
      const index_a: number = block.elements.indexOf(element);
      if (index_a !== -1){
        block.elements[index_a].options.push(newOptionRadio);
        this.textoRadio = "";
      }
    }
  }

  removeRadioOption(block:any, element:any, option:any){
    const index_a: number = block.elements.indexOf(element);
    if (index_a !== -1){
      const index_b: number = block.elements[index_a].options.indexOf(option)
      if(index_b !== -1){
        block.elements[index_a].options.splice(index_b, 1);
      }
    }
  }

 /*
  *   Opciones List
  */

 public textoList;

 addListOption(block:any, element:any, newOptionList:string){
  const index_a: number = block.elements.indexOf(element);
  if(newOptionList!=""){
    if (index_a !== -1){
      block.elements[index_a].options.push(newOptionList);
      this.textoList = "";
    }
  }
}

removeListOption(block:any, element:any, option:any){
  const index_a: number = block.elements.indexOf(element);
  if (index_a !== -1){
    const index_b: number = block.elements[index_a].options.indexOf(option)
    if(index_b !== -1){
      block.elements[index_a].options.splice(index_b, 1);
    }
  }
}

updateTemplate(){

  this.string_template = this.generateTemplate();
  this.plantillas.id = null;
  this.plantillas.version = this.plantillas.version + 1;
  this.plantillas.name = this.nombre_plantilla;
  this.plantillas.id_group = this.selected_grupos;
  this.plantillas.template = this.string_template;

  this._templateService.crear_plantilla(this.plantillas)
  .then(response => {
    if(this.firstHeader) {
      /* No se modifica el header */
      if(this.firstFooter) {
        /* No se modifica el footer */
        this._snackBar.open("Plantilla actualizada correctamente.", "cerrar", {
          duration: 2000,
        });                
        this._router.navigate(['/jefe/formularios']);
      } else {
        this.imageService.makeFileRequest(this.url+'upload-footer-template/'+response.plantillas.id, [], this.footerToUpload).then(
          (result: any) => {
            this._snackBar.open("Plantilla actualizada correctamente.", "cerrar", {
              duration: 2000,
            });                
            this._router.navigate(['/jefe/formularios']);
          }
        );
      }
    } else {
      this.imageService.makeFileRequest(this.url+'upload-header-template/'+response.plantillas.id, [], this.headerToUpload).then(
        (result: any) => {
          if(this.firstFooter) {
            /* No se modifica el footer */
            this._snackBar.open("Plantilla actualizada correctamente.", "cerrar", {
              duration: 2000,
            });                
            this._router.navigate(['/jefe/formularios']);
          } else {
            this.imageService.makeFileRequest(this.url+'upload-footer-template/'+response.plantillas.id, [], this.footerToUpload).then(
              (result: any) => {
                this._snackBar.open("Plantilla actualizada correctamente.", "cerrar", {
                  duration: 2000,
                });                
                this._router.navigate(['/jefe/formularios']);
              }
            );
          }
        }
      );
    }
  })
  .catch(error => {
        console.log(error);
        this._snackBar.open("Error al crear la plantilla", "cerrar", {
          duration: 2000,
        });
  });
}

generateTemplate(){
    let string_template = "";
    let i = 0, j = 0, k = 0;

    for (let block of this.blocks) {
      if(block.value || block.name){
        j = 0;
        string_template += block.name + "**[[**";
        for (let element of block.elements) {
          string_template += element.name + "-}{-";
          if(element.options){
            k = 0;
            for (let option of element.options) {
              string_template += option
              if(k < element.options.length - 1)
                string_template += "{--}";
              k++;
            }
          }
          if(element.value){
            string_template += element.value;
          }
          
          if(j < block.elements.length - 1)
            string_template += "*}{*";
          j++;
        }
        if(i < this.blocks.length - 1)
          string_template += "*[*";
          i++;
      }
      
    }

    return string_template;
}

}

