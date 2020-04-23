import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class JefeService {

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

  async obtenerEmpresa(id_empleado: number){
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_empresa_de_empleado/" + id_empleado, options).toPromise();
    return res.json();
  }

}
