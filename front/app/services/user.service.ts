import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  async crear_usuario(empleados:any) { 
    let headers = new Headers({
      'Content-type':'Application/json',
      'Authorization': this.getToken()
    });
  	let options = new RequestOptions({headers: headers});
	
	  const res = await this._http.post(this.url + "crear_empleado", empleados, options).toPromise();
	  return res.json();
  }

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
  }

  async obtener_lista_usuarios_por_empresa(empresa: any) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
		  
	const res = await this._http.get(this.url + "listar_empleados_empresa/" + empresa, options).toPromise();
	return res.json();
  }

  async asignar_usuario_empresa(empresa, empleado) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.post(this.url + "asignar_empresa_empleado", { empresa, empleado }, options).toPromise();
	return res.json();
  }

  async asignar_operario_a_jefe(id_empleado, id_jefe) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.post(this.url + "asignar_operario_jefe", { id_empleado, id_jefe }, options).toPromise();
	return res.json();
  }

  async obtenerEmpleadosSeleccionados(id, perfil) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.get(this.url + "recuperar_empleados_asignados/"+id+"/"+perfil, options).toPromise();
	return res.json();
  }

  async eliminar_jefes(id) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.delete(this.url + "eliminar_jefes/"+id, options).toPromise();
	return res.json();
  }
	
  async eliminar_operarios(id) {
	let headers = new Headers({
		'Content-type':'Application/json',
		'Authorization': this.getToken()
	});
	let options = new RequestOptions({headers: headers});
	  
	const res = await this._http.delete(this.url + "eliminar_operarios/"+id, options).toPromise();
	return res.json();
  }
}