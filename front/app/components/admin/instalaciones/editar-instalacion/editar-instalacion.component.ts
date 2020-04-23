import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../services/global';
import { EmpresaService } from '../../../../services/empresa.service';
import { InstalacionesService } from 'src/app/services/instalaciones.service';

@Component({
  selector: 'app-editar-instalacion',
  templateUrl: './editar-instalacion.component.html',
  styleUrls: ['./editar-instalacion.component.css']
})
export class EditarInstalacionComponent implements OnInit {
  public instalacion: any={};
  url;

  private empresas_disponibles: any;

  options_empresas = [];
  selected_empresas;
  

  constructor(
    private instalacionesService: InstalacionesService,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
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

        this.recuperarIdInstalacion();
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  recuperarIdInstalacion() {
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.instalacion.id = id;
      this.recuperarInstalacion(id);

    });
  }

  recuperarInstalacion(id) {
    this.instalacionesService.obtener_instalacion(id)
      .then( data => {
        this.instalacion = data.instalacione;

        var empresa_actual = this.empresas_disponibles.find(t => t.id == this.instalacion.id_empresa);
        this.selected_empresas = empresa_actual.name;
      })
      .catch( err => {
        console.log(err);
      });
  }

  editarInstalacion() {

    if(this.selected_empresas) {
      this.instalacion.id_panel = -1;
      var empresa_actual = this.empresas_disponibles.find(t => t.name == this.selected_empresas);
      this.instalacion.id_empresa = empresa_actual.id;

      this.enviarDatos();

    } else {
      this._snackBar.open("Debes seleccionar una empresa para editar la instalación", "cerrar", {
        duration: 2000,
      });
    } 
  }

  enviarDatos() {
    this.instalacionesService.editar_instalacion(this.instalacion)
        .then(response => {
          this.router.navigate(['/admin/instalaciones']);
          this._snackBar.open("La instalación se ha editado correctamente", "cerrar", {
            duration: 2000,
          });
        })
        .catch(error => {
          console.log(error);
          this._snackBar.open("Error al editar la instalación", "cerrar", {
            duration: 2000,
          });
        });
  }

  eliminarInstalacion() {
    this.instalacionesService.eliminar_instalacion(this.instalacion.id)
        .then(response => {
          this.router.navigate(['/admin/instalaciones']);
          this._snackBar.open("La instalación se ha eliminado correctamente", "cerrar", {
            duration: 2000,
          });
        })
        .catch(error => {
          console.log(error);
          this._snackBar.open("Error al eliminar la instalación", "cerrar", {
            duration: 2000,
          });
        });
  }

}
