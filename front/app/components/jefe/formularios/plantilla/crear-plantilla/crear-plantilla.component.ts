import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PlantillaService } from './../../../../../services/plantilla.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '../../../../../services/user.service';
import { GLOBAL } from '../../../../../services/global';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AuthService } from '../../../../../services/auth.service';
import { ImageService } from '../../../../../services/image.service';
import { OperacionesPlantillasService } from '../../../../../services/operaciones-plantillas.service';

@Component({
  selector: 'app-crear-plantilla',
  templateUrl: './crear-plantilla.component.html',
  styleUrls: ['./crear-plantilla.component.css']
})
export class JefeCrearPlantillaComponent implements OnInit {
  headerSrc;
  header;
  footerSrc;
  footer;

  public headerToUpload: Array<File>;
  public footerToUpload: Array<File>;

  bloque:any={};
  blocks = [];
  n_blocks = 0;

  grupos_disponibles: any[] = [];

  options_grupos = [/*"Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4", "Plantilla 5"*/];
  selected_grupos;

  url;
  view_params;

  private empresa: any;
  public identity: any;
  
  constructor(
    private _serviceTemplate: PlantillaService,
    public opService: OperacionesPlantillasService,
    private _userService: UserService,
    private imageService: ImageService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.view_params = false;
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {


    this.empresaService.obtenerNombreEmpresaEmpleado(this.identity.id)
    .then(resp => {
      this.empresa = resp.data[0];

      this.Iniciar();
    })
    .catch(err => {
      console.log(err);
    });

  }

  Iniciar() {
    this.url = GLOBAL.url;
    var name;
    var content;

    this.loadGroups();

    this._route.params.forEach((params: Params) => {
      let namef = decodeURIComponent(params['name']);
      let contentf = decodeURIComponent(params['content']);
      name = namef;
      content = contentf;
      this.headerSrc = decodeURIComponent(params['header']);
      this.footerSrc = decodeURIComponent(params['footer']);
      this.selected_grupos = +encodeURIComponent(params['grupo']);
      
    });

    if(name == 'undefined'){
      this.bloque = this.initBlock();
      this.blocks.push(this.bloque);
    }else{
      this.view_params = true;
      this.splitTemplate(name, content);
    }
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
  }
  
  loadGroups() {
    const grupos_cargados = this._serviceTemplate.obtener_lista_grupos(this.empresa.id);
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
          if(type == "numero" || type == "texto" || type == "archivo" || type == "imagen" || type == "firma"){
            element.value = options;
          }
          if(type == "radio" || type == "lista"){            
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

  public nombre_plantilla;
  private string_template;
  private plantillas:any={};

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

  changeGroup( data ) {
    this.selected_grupos = data;
  }

  saveTemplate() {
    if( this.headerToUpload && this.footerToUpload ){
      this.iniciarGuardado();
    } else {
      this._snackBar.open("Rellena el footer y header de la plantilla.", "cerrar", {
        duration: 2000,
      });  
    }
  }

  crearRelacionGrupoPlantilla() {
    this._serviceTemplate.crear_grupo_plantilla(this.plantillas.id_group, this.plantillas.id_template).then().catch(err=>{console.log(err);})
  }

  iniciarGuardado(){

    this.string_template = this.generateTemplate();

    this.plantillas.version = 1;
    this.plantillas.name = this.nombre_plantilla;
    this.plantillas.id_group = this.selected_grupos;
    this.plantillas.template = this.string_template;

    this._serviceTemplate.ultimo_id_plantilla()
      .then( response => {

        this.plantillas.id_template = response.id[0].id + 1;
        this.plantillas.id_empresa = this.empresa.id;

        this.crearRelacionGrupoPlantilla();

        this._serviceTemplate.crear_plantilla(this.plantillas)
          .then(response => {
            this.imageService.makeFileRequest(this.url+'upload-header-template/'+response.plantillas.id, [], this.headerToUpload).then(
              (result: any) => {
                this.imageService.makeFileRequest(this.url+'upload-footer-template/'+response.plantillas.id, [], this.footerToUpload).then(
                  (result: any) => {
                    this._snackBar.open("Plantilla creada correctamente.", "cerrar", {
                      duration: 2000,
                    });                
                    this._router.navigate(['/jefe/formularios']);
                  }
                );
                
              }
            );

          })
          .catch(error => {
          console.log(error);
          this._snackBar.open("Error al crear la plantilla", "cerrar", {
            duration: 2000,
          });
        });
      })
      .catch( err => {
        console.log(err);
      });

  }

  viewTemplate(){
    this.string_template = this.generateTemplate();
    this._router.navigate(['/jefe/formularios/previsualizar-plantilla/'+encodeURIComponent(this.nombre_plantilla)+'/'+encodeURIComponent(this.selected_grupos)+'/'+encodeURIComponent(this.string_template)+'/'+encodeURIComponent(this.headerSrc)+'/'+encodeURIComponent(this.footerSrc)]);
  }
}

