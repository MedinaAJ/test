import { Component, OnInit } from '@angular/core';
import { InstalacionesService } from 'src/app/services/instalaciones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ver-panel',
  templateUrl: './ver-panel.component.html',
  styleUrls: ['./ver-panel.component.css']
})
export class VerPanelComponent implements OnInit {

  public instalacion: any;
  public id: number;

  constructor(
    private instalacionesService: InstalacionesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.id = id;
      this.recuperarDatosInstalacion();
    });
  }

  recuperarDatosInstalacion() {
    this.instalacionesService.obtener_instalacion_id_panel(this.id)
      .then( data => {
        this.instalacion = data.instalacione;
      })
      .catch( err => {
        console.log(err);
      });
  }

}
