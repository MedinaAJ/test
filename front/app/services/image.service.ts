import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
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

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    var token = this.getToken();
    
    return new Promise(function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      
      for(var i = 0; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      } 
      
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}