import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
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

  async obtener_lista_plantillas(id) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "listar_plantillas/"+id, options).toPromise();
    return res.json();
  }

  async obtener_lista_plantillas_por_grupo(id, id_g) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "listar_plantillas_grupo/"+id+"/"+id_g, options).toPromise();
    return res.json();
  }

  async obtener_lista_grupos(id){
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "listar_grupos/"+id, options).toPromise();
    return res.json();
  }

  async obtener_lista_partes(id) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "listar_partes/"+id, options).toPromise();
    return res.json();
  }

  async obtener_lista_partes_iniciados(id, id_empleado) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_lista_partes_iniciados/"+id+"/"+id_empleado, options).toPromise();
    return res.json();
  }

  async obtener_lista_partes_finalizados(id, id_empleado) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_lista_partes_finalizados/"+id+"/"+id_empleado, options).toPromise();
    return res.json();
  }

  async obtener_lista_partes_no_iniciados(id, id_empleado) {
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
      
    const res = await this._http.get(this.url + "obtener_lista_partes_no_iniciados/"+id+"/"+id_empleado, options).toPromise();
    return res.json();
  }
}
