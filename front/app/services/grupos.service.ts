import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

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

  async crear_grupo(grupo:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	  const res = await this._http.post(this.url + "crear_grupo", grupo, options).toPromise();
	  return res.json();
  }

  async obtener_lista_plantillas_grupos(id){
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_plantillas_grupo/" + id, options).toPromise();
    return res.json();
  }

  async obtener_grupo(id:any) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_grupo/" + id , options).toPromise();
    return res.json();
  }

  async eliminar_grupo(id:any) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.delete(this.url + "eliminar_grupo/" + id , options).toPromise();
    return res.json();
  }

  async editar_grupo(grupo:any){
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.put(this.url + "editar_grupo", grupo, options).toPromise();
    return res.json();
    }
}
