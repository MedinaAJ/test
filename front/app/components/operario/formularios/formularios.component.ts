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

export class FormulariosOperarioComponent implements OnInit {

  public columnas_partes: String[] = ['id', 'nombre_obra', 'nombre_plantilla', 'NAME', 'fecha_inicio', 'fecha_fin']; 
  public nombre_columnas_partes: String[] = ['Nº', 'Nombre de obra', 'Nombre plantilla', 'Grupo', 'Fecha Inicio', 'Fecha fin'];

  datos_partes_no_iniciados: any;
  datos_partes_iniciados: any;  
  datos_partes_finalizados: any;
  
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
      this.obtenerPartesNoIniciados();
      this.obtenerPartesIniciados();
      this.obtenerPartesFinalizados();
    })
    .catch(err => {
      console.log(err);
    })

  }

  obtenerPartesNoIniciados() {

    this.formulariosService.obtener_lista_partes_no_iniciados(this.empresa.id, this.identity.id)
    .then(response => {
      this.datos_partes_no_iniciados = response.partes;
    })
    .catch(error => {
      console.log(error);
    });

  }

  obtenerPartesIniciados() {

    this.formulariosService.obtener_lista_partes_iniciados(this.empresa.id, this.identity.id)
    .then(response => {
      this.datos_partes_iniciados = response.partes;
    })
    .catch(error => {
      console.log(error);
    });

  }

  obtenerPartesFinalizados() {

    this.formulariosService.obtener_lista_partes_finalizados(this.empresa.id, this.identity.id)
    .then(response => {
      this.datos_partes_finalizados = response.partes;
    })
    .catch(error => {
      console.log(error);
    });

  }
}
