import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
  private url: string;
  public token;
  
	constructor(
		private _http:Http
	) {
		this.url = GLOBAL.url;
  }
  
  getToken(){
		let token = localStorage.getItem('token');
		
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		
		return this.token;
  }

  async crear_plantilla(plantillas:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	  const res = await this._http.post(this.url + "crear_plantilla", plantillas, options).toPromise();
	  return res.json();
  }

  async obtener_lista_grupos(id_empresa){
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "listar_grupos/"+id_empresa, options).toPromise();
    return res.json();
  }

  async ultimo_id_plantilla() {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_ultimo_id_plantilla", options).toPromise();
    return res.json();
  }

  async eliminar_plantilla(id:any, version:any) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.delete(this.url + "eliminar_plantilla/" + id + "/" + version, options).toPromise();
    return res.json();
  }

  async obtener_plantilla_ultima_version(id:any) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_ultima_plantilla/" + id, options).toPromise();
    return res.json();
  }

  async obtener_plantilla(id:any) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_plantilla/" + id, options).toPromise();
    return res.json();
  }

  async crear_grupo_plantilla(id_group, id_template) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
    
    var grupo_plantillas = {id_group: -1, id_template: -1};
    grupo_plantillas.id_group = id_group;
    grupo_plantillas.id_template = id_template;
	
	  const res = await this._http.post(this.url + "crear_grupo_plantilla", grupo_plantillas, options).toPromise();
	  return res.json();
  }
    
}