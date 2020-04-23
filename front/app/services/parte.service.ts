import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ParteService {

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

  async confirmar_parte(partes:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.put(this.url + "confirmar_parte", partes, options).toPromise();
	return res.json();
  }

  async iniciar_parte(partes:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.put(this.url + "iniciar_parte", partes, options).toPromise();
	return res.json();
  }

  async crear_parte(partes:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	  const res = await this._http.post(this.url + "crear_parte", partes, options).toPromise();
	  return res.json();
  }

  async obtener_parte(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "obtener_parte/" + id , options).toPromise();
	return res.json();
  }

  async obtener_parte_relleno(id: number) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "obtener_parte_relleno/" + id, options).toPromise();
	return res.json();
  }

  async get_firma(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "get-firma/" + id , options).toPromise();
	return res.json();
  }

  async eliminar_parte(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.delete(this.url + "eliminar_parte/" + id, options).toPromise();
	return res.json();
  }

  async obtener_plantilla_desde_parte(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "obtener_plantilla_desde_parte/" + id , options).toPromise();
	return res.json();
  }

  async crear_parte_relleno(partes:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.put(this.url + "crear_parte_relleno", partes, options).toPromise();
	return res.json();
  }

  async actualizar_usuario_guardado(partes:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.put(this.url + "editar_parte_relleno", partes, options).toPromise();
	return res.json();
  }

  async crear_firma(firma: string){
	let headers = new Headers({
		'Content-type':'Application/x-www-form-urlencoded',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	let params = "json="+firma;

	  
	const res = await this._http.post(this.url + "crear-firma", params , options).toPromise();
	return res.json();
  }

}
