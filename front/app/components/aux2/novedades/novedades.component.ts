import { Component, OnInit, Input } from '@angular/core';
import { JefeService } from '../../../services/jefe.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  @Input() usuario: any = {};
  private empresa: any = {};
  private url;

  constructor(
    private jefeService: JefeService,
  ) { this.url = GLOBAL.url; }

  ngOnInit() {
    this.obtenerEmpresa();

  }

  obtenerEmpresa() {
    this.jefeService.obtenerEmpresa(this.usuario.id) 
    .then( data => {
      this.empresa = data.data[0];
    })
    .catch( err => {
      console.log(err);
    });
  }

}
