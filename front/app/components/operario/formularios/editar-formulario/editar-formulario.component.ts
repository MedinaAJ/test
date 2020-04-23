import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ParteService } from 'src/app/services/parte.service';
import { GLOBAL } from '../../../../services/global';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { element } from 'protractor';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-formulario',
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.css']
})
export class OperarioEditarParteComponent implements AfterViewInit {

  @ViewChild('canvas', {static: false}) public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

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

  options = [/*"Option 1", "Option 2", "Option 3", "Option 4", "Option 5"*/];
  selected = [];
  usuario_activo;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private templateService: ParteService
    ) { 
      this.inicioComponent();
      this.usuario_activo = this.authService.getIdentity();
      console.log(this.usuario_activo);
     }

  limpiarFirma() {
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
  }

  prepararFirma() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    //canvasEl.width = this.width;
    //canvasEl.height = this.height;

    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }

  

  inicioComponent() {
    var id;
    this._route.params.forEach((params: Params) => {
      id = params['id'];		
      this.id = id;	
    });
    
    this.templateService.obtener_parte(id)
      .then( parte => {
        console.log(parte.parte);
        this.parte = parte.parte;

        if(!this.parte.usuario_inicio && this.parte) {
          this.crearHoraInicio();
        }

       /* if(parte.parte.parte_relleno){
          console.log("El parte tiene contenido");
          this.recuperarParteRelleno();
        }else{
          console.log("El parte no tiene contenido");*/
          this.recuperarParte();
       // }
      })
      .catch( err => {
        console.log(err);
      });
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

  crearHoraInicio() {
    this.parte.usuario_inicio = this.usuario_activo.email;
    this.templateService.iniciar_parte(this.parte)
    .then( data => {
      this._snackBar.open("El parte ha sido iniciado", "cerrar", {
        duration: 2000,
      });
    })
    .catch( err => {
      console.log(err);
    });
  }
  

  splitRelleno(/*name:string,*/ content:string) {
    //this.nombre_plantilla = name;

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
            this.templateService.get_firma(element.user_value)
              .then(result => {
                console.log("RESULTADO OBTENER FIRMA");
                //console.log(result.firma[0].firma);
                if(result.firma)
                  element.path = result.firma[0].firma;
              })
              .catch(err => {
                console.log(err);
              });

          }
        }
        else if(type == "radio" || type == "lista"){    

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

  recuperarParte() {
    
    this.templateService.obtener_plantilla_desde_parte(this.parte.id_parte)
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

splitTemplate(name:string, content:string){
  this.nombre_plantilla = name;

  if(this.parte.parte_relleno) this.splitRelleno(this.parte.parte_relleno);
  else {

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
        if(type == "numero" || type == "texto" || type == "archivo" || type == "firma" || type == "imagen"){
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
}

public ngAfterViewInit() {
  /*const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  this.cx = canvasEl.getContext('2d');

  canvasEl.width = this.width;
  canvasEl.height = this.height;

  this.cx.lineWidth = 1;
  this.cx.lineCap = 'round';
  this.cx.strokeStyle = '#000';

  this.captureEvents(canvasEl);*/
}

private captureEvents(canvasEl: HTMLCanvasElement) {
  // this will capture all mousedown events from the canvas element
  fromEvent(canvasEl, 'mousedown')
    .pipe(
      switchMap((e) => {
        // after a mouse down, we'll record all mouse moves
        return fromEvent(canvasEl, 'mousemove')
          .pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event    
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point    
            pairwise()
          )
      })
    )
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();

      // previous and current position with the offset
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      // this method we'll implement soon to do the actual drawing
      this.drawOnCanvas(prevPos, currentPos);
    });
}

private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
  if (!this.cx) { return; }

  this.cx.beginPath();

  if (prevPos) {
    this.cx.moveTo(prevPos.x, prevPos.y); // from
    this.cx.lineTo(currentPos.x, currentPos.y);
    this.cx.stroke();
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

saveTemplate() {
  console.log("BLOCKS");
  console.log(this.blocks);

  console.log(this.usuario_activo);

  console.log("Guardando archivos de parte");

  this.storeFiles();

  console.log("/Guardando archivos de parte");

  console.log("BLOCKS");
  console.log(this.blocks);
}


guardarCambios(){
  this.storeFiles();
  
  this.parte.id = this.id;
  this.parte.id_empleado = this.usuario_activo.id_employee; 
  this.string_template = this.generateParte();

  this.parte.parte_relleno = this.string_template;

  this.templateService.crear_parte_relleno(this.parte)
    .then(response => {

      this._snackBar.open("Parte creado correctamente", "cerrar", {
        duration: 2000,
      });

      this.parte.ultimo_usuario = this.usuario_activo.email;

      this.templateService.actualizar_usuario_guardado(this.parte)
      .then( () => {
        this._router.navigate(['/operario/formularios/ver-parte/'+this.id]);
      })
      .catch(err => {
        console.log(err);
      });

    })
    .catch(err => {
      this._snackBar.open("Error al rellenar el parte", "cerrar", {
        duration: 2000,
      });
    });
}


changeFile(event, element) {
  element.user_value = event.target.files;
}

changeImagen(event, element) {
  element.user_value = event.target.files;
}

changeFirma(event, element) {
  const canvas: HTMLCanvasElement = this.canvas.nativeElement;
  const image = canvas.toDataURL('image/png');

  element.user_value = image;
}

generateParte(){
  let string_template = "";
  let i = 0, j = 0, k = 0;

  for (let block of this.blocks) {
    if(block.value || block.name){
      j = 0;
      string_template += block.name + "**[[**";
      for (let element of block.elements) {
        string_template += element.name + "--}**{--" + this.getValue(element)  + "-}{-";
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

getValue(element) {
  if(element.user_value) return element.user_value;
  return "null";
}

storeFiles(){

  for (let block of this.blocks) {
    for (let element of block.elements){
      if (element.user_value) {
        if( element.name === 'archivo' || element.name === 'imagen' ){

          console.log("USER VALUE");
          console.log(element.user_value);

          if( element.user_value && element.user_value !== 'null'){
            this.makeFileRequest(this.url+'upload-file', [], <Array<File>>element.user_value).then(
              (result: any) => {
                element.user_value = result.file;
              }
            );
          }
          
        } else if ( element.name === 'firma' ) {          
          this.templateService.crear_firma(element.user_value)
            .then(result => {
              element.user_value = result.firma.id;
            })
            .catch(err => {
              console.log(err);
            });

        }
      }
    }
  }
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>){
  var token = this._userService.getToken();
  
  return new Promise(function(resolve, reject){
    var formData:any = new FormData();
    var xhr = new XMLHttpRequest();
    
    for(var i = 0; i < files.length; i++){
      formData.append('image', files[i], files[i].name);
    } 
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          resolve(JSON.parse(xhr.response));
        }else{
          reject(xhr.response);
        }
      }
    }
    
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.send(formData);
  });
}

}

