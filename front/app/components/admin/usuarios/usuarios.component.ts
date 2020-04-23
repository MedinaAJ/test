import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public columnas_empresa: String[] = ['name', 'responsable', 'phone'];
  public nombre_columnas_empresa: String[] = ['Nombre', 'Persona responsable', 'Telefono'];
  datos_empresa: any;

  public columnas_empleados: String[] = ['firstname', 'email', 'id_profile', 'phone', 'field1'];
  public nombre_columnas_empleados: String[] = ['Nombre', 'Email', 'Tipo', 'Telefono', 'Campo 1'];
  datos_empleados: any;

  constructor(
    private empresaService: EmpresaService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userService.obtener_lista_usuarios()
      .then(data => {
        this.datos_empleados = data;
      })
      .catch(function(err) {
        console.log(err);
      });

    this.empresaService.listar_empresas()
      .then(data => {
        this.datos_empresa = data;
      })
      .catch(function(err) {
        console.log(err);
      });

  }

}
