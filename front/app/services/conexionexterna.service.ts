import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConexionexternaService {

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

  async test_conexion(conexion:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.post(this.url + "test_conexion", conexion, options).toPromise();
	return res.json();
  }
}
