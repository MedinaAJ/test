import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../../services/global';
import { EmpresaService } from '../../../../../services/empresa.service';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {
  public empleados: any={};
  public jefe;
  public operario;
  url;

  private empleados_disponibles: any;
  private empresas_disponibles: any;

  options_empresas = [];
  selected_empresas;
  
  options_empleados = [];
  selected_empleados = [];

  options_jefes = [];
  selected_jefes = [];

  constructor(
    private userService: UserService,
    private empresaService: EmpresaService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.jefe, this.operario = false;
   }

  ngOnInit() {
    this.url = GLOBAL.url;

    this.empresaService.listar_empresas()
      .then((data) => {

        this.empresas_disponibles = data.empresa;
        data.empresa.forEach( element => {
          console.log(element);
          this.options_empresas.push(element.name);
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    this.userService.obtener_lista_usuarios()
      .then(data => {
        
        this.empleados_disponibles = data.empleados;
        data.empleados.forEach( element => {
          if( element.id_profile == 2 ) {
            this.options_jefes.push(element.email);
          } else if( element.id_profile == 3 ) {
            this.options_empleados.push(element.email);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

  }

  /* Acciones de usuario */ 
  createUser(mas){
    if (this.empleados.super && this.selected_empresas){
      
      this.userService.crear_usuario(this.empleados)
        .then(response => {
          var id = response.empleados.id;
          this.asignarEmpresaUsuario(id, mas);
        })
        .catch(error => {
        console.log(error);
        this._snackBar.open("Error al crear usuario", "cerrar", {
            duration: 2000,
          });
        });

    } else {
      this._snackBar.open("Rellena todos los campos", "cerrar", {
        duration: 2000,
      });
    }
  }

  asignarEmpresaUsuario(id, mas) {
    this.empresas_disponibles.forEach( element => {
      if( element.name == this.selected_empresas ) { 


        var id_empresa = element.id;

        this.userService.asignar_usuario_empresa(id_empresa, id)
          .then( response => {
            this.asignarEmpleadosJefes(id);

            if( !mas )
              this._router.navigate(['/admin/usuarios']);
            else 
              this._router.navigateByUrl('/admin/usuarios', { skipLocationChange: true }).then(() => {
                this._router.navigate(['/admin/usuarios/crear-usuario']);
              }); 
            
          })
          .catch( err => {
            console.log(err);
          });
      }
    });
  }

  asignarEmpleadosJefes(id_empleado_nuevo) {

    /* Crea los servicios para asignar usuario y jefe de manera bidireccional. Los usuarios o jefes los haras en funcion de si eres operario o jefe */
    if(this.jefe && this.selected_empleados.length > 0) {
      for(var i = 0; i < this.selected_empleados.length; i++) {

        this.empleados_disponibles.forEach( element => {
          if( element.email == this.selected_empleados[i]){
            this.userService.asignar_operario_a_jefe(element.id, id_empleado_nuevo /*jefe*/)
              .then()
              .catch( err => {
                console.log(err);
              });
          }
        });

      }
    } else if(this.operario && this.selected_jefes.length > 0) {
      for(var i = 0; i < this.selected_jefes.length; i++) {
        this.empleados_disponibles.forEach( element => {
          if( element.email == this.selected_jefes[i]){
            this.userService.asignar_operario_a_jefe( id_empleado_nuevo, element.id )
              .then()
              .catch( err => {
                console.log(err);
              });
          }
        });

          
      }
    }

    this._snackBar.open("Usuario creado correctamente.", "cerrar", {
      duration: 2000,
    });
  }

  verificarRol(){

    console.log(this.selected_empresas);

    this.userService.obtener_lista_usuarios_por_empresa(this.selected_empresas)
      .then(data => {

        this.options_jefes = [];
        this.options_empleados = [];

        this.empleados_disponibles = data.data;
        data.data.forEach( element => {
          if( element.id_profile == 2 ) {
            this.options_jefes.push(element.email);
          } else if( element.id_profile == 3 ) {
            this.options_empleados.push(element.email);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    if(this.empleados.id_profile == '2'){
      this.jefe = true;
      this.operario = false;
    }else{
      this.jefe = false;
      this.operario = true;
    }
  }

  verificarPrivilegios() {
    //console.log(this.empleados.super);
  }

}
