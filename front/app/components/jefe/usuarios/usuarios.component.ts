import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { JefeService } from 'src/app/services/jefe.service';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosJefeComponent implements OnInit {

  public columnas_empleados: String[] = ['firstname', 'email', 'iprofile', 'n_jefes', 'n_operarios'];
  public nombre_columnas_empleados: String[] = ['Nombre', 'Email', 'Tipo', 'Jefes asignados', 'Operarios asignados'];
  datos_empleados: any;

  private identity: any;
  private empresa: any;

  constructor(
    private authService: AuthService,
    private jefeService: JefeService,
    private empresaService: EmpresaService
  ) { 
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {
    this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    this.jefeService.obtenerEmpresa(this.identity.id) 
    .then( data => {
      this.empresa = data.data[0];
      this.obtenerUsuariosEmpresa();
    })
    .catch( err => {
      console.log(err);
    });
  }

  obtenerUsuariosEmpresa() {
    this.empresaService.obtener_lista_usuarios_por_empresa(this.empresa.id)
    .then( data => {
      for(var i = 0; i < data.data.length; i++) {
        if (data.data[i].id_profile == 3 ) {
          data.data[i].n_operarios = null;
        } else {
          data.data[i].n_operarios = data.data[i].n_jefes;
          data.data[i].n_jefes = null;
        }
      }
      this.datos_empleados = data;
    })
    .catch( err => {
      console.log(err);
    });
  }

}
