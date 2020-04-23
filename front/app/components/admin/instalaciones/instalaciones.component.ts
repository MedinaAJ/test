import { Component, OnInit } from '@angular/core';
import { InstalacionesService } from '../../../services/instalaciones.service';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.css']
})
export class InstalacionesComponent implements OnInit {

  public columnas_instalaciones: String[] = ['name', 'localidad', 'provincia', 'id'];
  public nombre_columnas_instalaciones: String[] = ['Nombre Instalación', 'Localidad', 'Provincia', 'Id'];
  public datos_instalaciones: any;

  constructor(
    private instalacionesService: InstalacionesService
  ) { }

  ngOnInit() {
    this.instalacionesService.lista_todas_instalaciones()
      .then(data => {
        this.datos_instalaciones = data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

