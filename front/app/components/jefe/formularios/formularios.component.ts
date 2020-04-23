import { Component, OnInit/*paginator*/ , ViewChild/*end paginator*/  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormulariosService } from 'src/app/services/formularios.service';
import { EmpresaService } from '../../../services/empresa.service';


@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})

export class FormulariosJefeComponent implements OnInit {

  public columnas_partes: String[] = ['id', 'nombre_obra', 'nombre_plantilla', 'firstname', 'NAME', 'jefe_mando', 'fecha_inicio', 'fecha_fin', 'fecha_vencimiento', 'localizacion_inicio', 'localizacion_fin']; // Change it
  public nombre_columnas_partes: String[] = ['Nº', 'Nombre de obra', 'Nombre plantilla', 'Asignada a', 'Grupo', 'Orden de', 'Fecha Inicio', 'Fecha fin', 'Fecha Vencimiento', 'Localizacion inicio', 'Localizacion fin'];
  datos_partes: any;

  public columnas_plantillas: String[] = ['id_template', 'version', 'name', 'nameg', 'createdAt'];
  public nombre_columnas_plantillas: String[] = ['Nº', 'Version', 'Nombre', 'Grupo', 'Fecha de creacion'];
  datos_plantillas: any;

  public columnas_grupos: String[] = ['id', 'name', 'n_templates'];
  public nombre_columnas_grupos: String[] = ['Nº', 'Nombre de grupo', 'Plantillas'];
  datos_grupos: any;
  
  private identity: any;
  private empresa: any;

  constructor(
    private authService: AuthService,
    private formulariosService: FormulariosService,
    private empresaService: EmpresaService
  ) {
    this.identity = this.authService.getIdentity();
   }

  ngOnInit() {

    this.empresaService.obtenerNombreEmpresaEmpleado(this.identity.id)
    .then(resp => {
      this.empresa = resp.data[0];

      this.obtenerPlantillas();
      this.obtenerGrupos();
      this.obtenerPartes();
    })
    .catch(err => {
      console.log(err);
    });

  }

  obtenerPartes() {

    this.formulariosService.obtener_lista_partes(this.empresa.id)
    .then(response => {
      //console.log(response.partes);
      this.datos_partes = response.partes;
    })
    .catch(error => {
      console.log(error);
    });

  }

  obtenerGrupos() {

    this.formulariosService.obtener_lista_grupos(this.empresa.id)
      .then(response => {
        this.datos_grupos = response.grupos;
      })
      .catch(error => {
        console.log(error);
      });

  }

  obtenerPlantillas() {

    this.formulariosService.obtener_lista_plantillas(this.empresa.id)
      .then(response => {
        this.datos_plantillas = response.plantillas;
      })
      .catch(error => {
        console.log(error);
      });

  }

}
