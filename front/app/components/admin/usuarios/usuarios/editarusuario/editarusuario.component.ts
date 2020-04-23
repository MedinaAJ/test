import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../../services/global';
import { EmpresaService } from '../../../../../services/empresa.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
  public empleados: any={};
  public jefe;
  public operario;
  public nombre_empresa: string;
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
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.jefe, this.operario = false;
   }

  ngOnInit() {

    this.recuperarInformacionUsuario();

    this.url = GLOBAL.url;

    this.empresaService.listar_empresas()
      .then((data) => {
        this.empresas_disponibles = data.empresa;
        data.empresa.forEach( element => {
          this.options_empresas.push(element.name);
        });
      })
      .catch(function(err) {
        console.log(err);
      });

  }

  public checkActive(event: MatSlideToggleChange) {
    if (event.checked) {
      this.empleados.active = 1;
    } else {
      this.empleados.active = 0;
    }
    this.userService.actualizar_usuario(this.empleados)
        .then(response => {
          if (event.checked) {
            this._snackBar.open("Usuario activado correctamente", "cerrar", {
              duration: 2000,
            });
          } else {
            this._snackBar.open("Usuario desactivado correctamente", "cerrar", {
              duration: 2000,
            });
          }
        })
        .catch(error => {
          console.log(error);
          this._snackBar.open("Error al activar/desactivar usuario", "cerrar", {
              duration: 2000,
            });
        });
    // this.useDefault = event.checked;
  }

  eliminarUsuario() {
    this.userService.eliminar_usuario(this.empleados.id)
    .then( data => {
      this.router.navigate(['/admin/usuarios']);
      this._snackBar.open("Usuario eliminado correctamente", "cerrar", {
        duration: 2000,
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  recuperarEmpleadosEmpresa() {
    this.userService.obtener_lista_usuarios_por_empresa(this.nombre_empresa)
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
  }

  recuperarInformacionUsuario() {
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.empleados.id_employee = id;
      
      this.userService.obtener_usuario(id)
      .then(response => {
        this.empleados = response.empleados;

        this.empresaService.obtenerNombreEmpresaEmpleado(this.empleados.id)
          .then( data => {
            this.nombre_empresa = data.data[0].name;
            this.recuperarEmpleadosEmpresa();
          })
          .catch( err => {
            console.log(err);
          });

        this.userService.obtenerEmpleadosSeleccionados(this.empleados.id, this.empleados.id_profile)
          .then( data => {
           // this.nombre_empresa = data.data[0].name;

           if( this.empleados.id_profile == 3){
              data.data.forEach( element => { this.selected_jefes.push(element.email) });
           } else if( this.empleados.id_profile == 2){
              data.data.forEach( element => { this.selected_empleados.push(element.email) });
           } 
          })
          .catch( err => {
            console.log(err);
          });
      
      })
      .catch(error => {
        console.log(error);
      });
			
		});
  }

  /* Acciones de usuario */ 
  editUser(){
      
      this.userService.actualizar_usuario(this.empleados)
        .then(response => {
          this.reasignarJefesOperarios(this.empleados.id, response);
          this._snackBar.open("Usuario editado correctamente", "cerrar", {
            duration: 2000,
          });
          this.router.navigate(['/admin/usuarios']);
        })
        .catch(error => {
          console.log(error);
          this._snackBar.open("Error al editar usuario", "cerrar", {
              duration: 2000,
            });
        });

  }

  reasignarJefesOperarios(id, mensaje_fin) {

    if(this.empleados.id_profile == 2) {
        this.userService.eliminar_operarios(id)
          .then(() => {
            for(var i = 0; i < this.selected_empleados.length; i++) {
              this.empleados_disponibles.forEach( element => {
                if( element.email == this.selected_empleados[i]){
                  this.userService.asignar_operario_a_jefe(element.id, id /*jefe*/)
                    .then(() => {
                      //this._snackBar.open(mensaje_fin, "cerrar", {
                      //  duration: 2000,
                     // });
                    })
                    .catch( err => {
                      console.log(err);
                    });
                }
              });
            } 
          })
          .catch(err => {
            console.log(err);
          });

      
    } else if(this.empleados.id_profile == 3) {
      
        this.userService.eliminar_jefes(id)
          .then(() => {
            for(var i = 0; i < this.selected_jefes.length; i++) {
              this.empleados_disponibles.forEach( element => {
                if( element.email == this.selected_jefes[i]){
                  this.userService.asignar_operario_a_jefe( id, element.id )
                  .then(() => {
                    this._snackBar.open(mensaje_fin, "cerrar", {
                      duration: 2000,
                    });
                  })
                  .catch( err => {
                    console.log(err);
                  });
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      
    }
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
