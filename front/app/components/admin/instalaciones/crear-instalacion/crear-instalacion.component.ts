import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../services/global';
import { EmpresaService } from '../../../../services/empresa.service';
import { InstalacionesService } from 'src/app/services/instalaciones.service';

@Component({
  selector: 'app-crear-instalacion',
  templateUrl: './crear-instalacion.component.html',
  styleUrls: ['./crear-instalacion.component.css']
})
export class CrearInstalacionComponent implements OnInit {
  public instalacion: any={};
  url;

  private empresas_disponibles: any;

  options_empresas = [];
  selected_empresas;
  

  constructor(
    private instalacionesService: InstalacionesService,
    private empresaService: EmpresaService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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

  createInstalacion(panel) {

    if(this.selected_empresas) {
      this.instalacion.id_panel = -1;
      var empresa_actual = this.empresas_disponibles.find(t => t.name == this.selected_empresas);
      this.instalacion.id_empresa = empresa_actual.id;

      this.enviarDatos(panel);

    } else {
      this._snackBar.open("Debes seleccionar una empresa para crear la instalación", "cerrar", {
        duration: 2000,
      });
    } 
  }

  enviarDatos(panel) {
    this.instalacionesService.crear_instalacion(this.instalacion)
        .then(response => {
          if( !panel )
              this._router.navigate(['/admin/instalaciones']);
          else 
              this._router.navigateByUrl('/admin/instalaciones', { skipLocationChange: true }).then(() => {
                this._router.navigate(['/admin/instalaciones/editar-panel']);
              }); 
          this._snackBar.open("La instalación se ha creado correctamente", "cerrar", {
            duration: 2000,
          });
        })
        .catch(error => {
          console.log(error);
          this._snackBar.open("Error al crear la instalación", "cerrar", {
            duration: 2000,
          });
        });
  }

}
