import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public employee:any={};
	
  constructor(
    private _serviceLogin: LoginService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  login(){
	  
	  this._serviceLogin.inicio_sesion(this.employee, true)
	  .then(response => {
      if(response.empleados.active == 1){
        localStorage.setItem('identity_user', JSON.stringify(response.empleados));
        localStorage.setItem('token', JSON.stringify(response.token));

        if(response.empleados.id_profile == 1){
          this._router.navigate(['/admin/inicio']);
        }else if(response.empleados.id_profile == 2){
          this._router.navigate(['/jefe/inicio']);
        }else if(response.empleados.id_profile == 3){
          this._router.navigate(['/operario/inicio']);
        }else {
          this.snackBar.open("Tipo de usuario no identificado", "cerrar", {
            duration: 2000,
          });
        }
      } else {
        this.snackBar.open("El usuario con el que intenta acceder no esta activado", "cerrar", {
          duration: 2000,
        });
      }
	  })
	  .catch(error => {
     console.log(error);
     this.snackBar.open("Error al iniciar sesion", "cerrar", {
      duration: 2000,
    });
	  });
  }
}
