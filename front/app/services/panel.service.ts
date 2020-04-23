import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private url: string;
  public token;
  
	constructor(
		private _http: Http
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

  async obtener_panel(id) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.get(this.url + "obtener_panel/"+id, options).toPromise();
	return res.json();
  }

  async actualizarPanel(panel: any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.put(this.url + "editar_panel", panel, options).toPromise();
	return res.json();
  }
/*
  async obtener_instalacion_id_panel(id) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.get(this.url + "obtener_instalacion_id_panel/"+id, options).toPromise();
	return res.json();
  }

  async editar_instalacion(instalacion: any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.put(this.url + "editar_instalacion", instalacion, options).toPromise();
	return res.json();
  }

  async eliminar_instalacion(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.delete(this.url + "eliminar_instalacion/" + id, options).toPromise();
	return res.json();
  }

  async lista_todas_instalaciones() { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.get(this.url + "lista_todas_instalaciones", options).toPromise();
	return res.json();
  }
  */
}
