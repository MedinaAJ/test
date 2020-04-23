import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPlantillasService {

  constructor() { }

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

  isList(element:any){
    if(element.name == "lista")
      return true;
    else 
      return false;
  }
}
