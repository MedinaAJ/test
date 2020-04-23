import { Component, OnInit } from '@angular/core';
import { PlantillaService } from './../../../../../services/plantilla.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../../services/global';
import { OperacionesPlantillasService } from 'src/app/services/operaciones-plantillas.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-previsualizar-plantilla',
  templateUrl: './previsualizar-plantilla.component.html',
  styleUrls: ['./previsualizar-plantilla.component.css']
})
export class PrevisualizarPlantillaComponent implements OnInit {

  headerSrc;
  header;
  footerSrc;
  footer;

  public headerToUpload: Array<File>;
  public footerToUpload: Array<File>;

  url;

  bloque:any={};
  blocks = [];
  n_blocks = 0;
  public nombre_plantilla;
  private plantillas:any={};
  private string_template:string;
  private selected_grupos;

  public identity: any = {};

  constructor(
    private _serviceTemplate: PlantillaService,
    public opService: OperacionesPlantillasService,
    private _router: Router,
    private authService: AuthService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.url = GLOBAL.url;
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {

    this._route.params.forEach((params: Params) => {
      this.nombre_plantilla = decodeURIComponent(params['name']);
      this.string_template = decodeURIComponent(params['content']);
      this.headerSrc = decodeURIComponent(params['header']);
      this.footerSrc = decodeURIComponent(params['footer']);
      this.selected_grupos = encodeURIComponent(params['grupo']);
    });

    this.splitTemplate(this.nombre_plantilla, this.string_template);
    
  }

  splitTemplate(name, content){

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
        this.bloque.value=name_block;
        this.bloque.elements = [];

        for(let option_block of options_block){
          var element:any={};
          element.options = [];

          array_option = option_block.split("-}{-");
          type = array_option[0];
          options = array_option[1];
          element.name = type;
          if(type == "numero" || type == "texto" || type == "archivo" || "imagen"){
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
    this.bloque.name="bloque-"+this.n_blocks;
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

  removeElement(bloque_seleccionado, elemento_eliminar){
    const index: number = bloque_seleccionado.elements.indexOf(elemento_eliminar);
    if (index !== -1){
      bloque_seleccionado.elements.splice(index, 1);
    }
  }

  /*
  *   Opciones radio button
  */

 private textoRadio;

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

 private textoList;

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

backToCreate(){
  this._router.navigate(['/jefe/formularios/crear-plantilla/'+encodeURIComponent(this.nombre_plantilla)+'/'+encodeURIComponent(this.selected_grupos)+'/'+encodeURIComponent(this.string_template)+'/'+encodeURIComponent(this.headerSrc)+'/'+encodeURIComponent(this.footerSrc)]);
}


}

