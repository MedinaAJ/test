import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
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

  async crear_empresa(empresa:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	const res = await this._http.post(this.url + "crear_empresa", empresa, options).toPromise();
	return res.json();
  }

  async listar_empresas() {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "listar_empresas", options).toPromise();
	return res.json();
  }

  async obtenerNombreEmpresaEmpleado(id) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "empresa_empleado/"+id, options).toPromise();
	return res.json();
  }

  async getEmpresa(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.get(this.url + "obtener_empresa/" + id, options).toPromise();
		return res.json();
  }

  async editar_empresa(empresa: any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.put(this.url + "editar_empresa", empresa, options).toPromise();
	return res.json();
  }

  async obtener_lista_usuarios_por_empresa(id) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.get(this.url + "obtener_empleados_por_empresa/" + id, options).toPromise();
		return res.json();
  }

  async obtener_todos_usuarios_de_empresa(id) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.get(this.url + "todos_empleados_de_empresa/" + id, options).toPromise();
		return res.json();
  }

  /*
  async obtener_lista_usuarios() {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.get(this.url + "listar_empleados", options).toPromise();
		return res.json();
  }

  async obtener_usuario(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.get(this.url + "obtener_empleado/" + id, options).toPromise();
		return res.json();
  }

  async actualizar_usuario(empleados:any){
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.put(this.url + "editar_empleado", empleados, options).toPromise();
	return res.json();
  }

  async eliminar_usuario(id:any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	  });
		let options = new RequestOptions({headers: headers});
	  
		const res = await this._http.delete(this.url + "eliminar_empleado/" + id, options).toPromise();
		return res.json();
  } */
}