import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ParteService } from '../../../../services/parte.service';
import { GLOBAL } from '../../../../services/global';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-ver-formulario',
  templateUrl: './ver-formulario.component.html',
  styleUrls: ['./ver-formulario.component.css']
})
export class OperarioVerParteComponent implements AfterViewInit {

  header;
  footer;

  public headerToUpload: Array<File>;
  public footerToUpload: Array<File>;

  parte;
  url;
  id;

  public plantillas:any={};
  private string_template;
  public nombre_plantilla;

  bloque:any={};
  blocks = [];
  n_blocks = 0;
  usuario_activo: any = {};

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private templateService: ParteService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private authService: AuthService
    ) { this.iniciar(); this.usuario_activo = this.authService.getIdentity(); }

  public ngAfterViewInit() {
      
  }

  confirmarParte() {
    if( this.parte && !this.parte.usuario_confirmacion && this.parte.parte_relleno){
      this.parte.usuario_confirmacion = this.usuario_activo.email;
      this.templateService.confirmar_parte(this.parte)
      .then( data => {
        this._snackBar.open("El parte ha sido confirmado", "cerrar", {
          duration: 2000,
        });
      })
      .catch( err => {
        console.log(err);
      });
    }
  }

  eliminarParte() {
    this.templateService.eliminar_parte(this.id)
    .then( data => {
      this._snackBar.open("Parte de usuario eliminado correctamente.", "cerrar", {
        duration: 2000,
      });
      this._router.navigate(['/operario/formularios']);
    })
    .catch( err => {
      console.log(err);
    });
  }

  iniciar() {
    var id;
    this._route.params.forEach((params: Params) => {
      id = params['id'];		
      this.id = id;	
    });
    
    this.templateService.obtener_parte(id)
      .then( parte => {
        console.log(parte);
        this.parte = parte.parte;

        if(this.parte.parte_relleno){
          this.recuperarParte();
        }
      })
      .catch( err => {
        console.log(err);
      });
  }

  recuperarParte() {
    
    this.templateService.obtener_parte_relleno(this.id)
      .then( plantilla => {
        console.log(plantilla);

        this.formatearDatos(plantilla);
      })
      .catch( err => {
        console.log(err);
      });

  }

  formatearDatos( plantilla: any ) {
    this.url = GLOBAL.url;
    this.header = plantilla.plantilla[0].header;
    this.footer = plantilla.plantilla[0].footer;
    this.nombre_plantilla = plantilla.plantilla[0].name;
    
    
    this.splitTemplate(this.nombre_plantilla, plantilla.plantilla[0].template);

  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

        var sep_value_of_type = type.split("--}**{--");

        element.name = sep_value_of_type[0];
        type = sep_value_of_type[0];

        if(type == "numero" || type == "texto" || type == "archivo" || type == "firma" || type == "imagen"){
          element.value = options;
          element.user_value = sep_value_of_type[1];
          if(type == "firma"){
           // this.templateService.get_firma(element.user_value)
            //  .then(result => {
           //     console.log("RESULTADO OBTENER FIRMA");
           //     //console.log(result.firma[0].firma);
           //     if(result.firma)
           //       element.path = result.firma[0].firma;
           //   })
           //   .catch(err => {
           //     console.log(err);
           //   });

          }
        }
        if(type == "radio" || type == "lista"){    

          if(type == "radio") element.user_value = sep_value_of_type[1];
          else element.user_value = sep_value_of_type[1].split(",");    

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
  * Ifs al recorrer un bloque
  */

 isText(element:any){
  if(element.name == "texto")
    return true;
  else 
    return false;
}

isNumber(element:any){
  if(element.name == "numero")
    return true;
  else 
    return false;
}

isRadio(element:any){
  if(element.name == "radio")
    return true;
  else 
    return false;
}

isFile(element:any){
  if(element.name == "archivo")
    return true;
  else 
    return false;
}

isList(element:any){
  if(element.name == "lista")
    return true;
  else 
    return false;
}

isFirma(element:any){
  if(element.name == "firma")
    return true;
  else 
    return false;
}

isImagen(element:any){
  if(element.name == "imagen")
    return true;
  else 
    return false;
}


}


