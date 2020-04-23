import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PanelService } from 'src/app/services/panel.service';
import { ConexionexternaService } from 'src/app/services/conexionexterna.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-monitorizar',
  templateUrl: './monitorizar.component.html',
  styleUrls: ['./monitorizar.component.css']
})
export class MonitorizarComponent implements OnInit {

  @Input() id: number;

  public instalacion: any;
  public panel: any;
  public posible: boolean;

  public gen_panel: any;
  public identity: any;

  constructor(
    private authService: AuthService,
    private panelService: PanelService,
    private conexionexternaService: ConexionexternaService,
    private _snackBar: MatSnackBar
  ) { this.identity = this.authService.getIdentity(); }

  ngOnInit() {
    this.panel = {};
    this.gen_panel = {};
    this.gen_panel.config = {};
    this.gen_panel.config.conexiones = [];
    
    this.panelService.obtener_panel(this.id)
      .then( data => {
        if( data.panel ) {
          if( data.panel.content == "" ) {
            this.posible = false;
          } else {
            this.posible = true;
            this.panel = data.panel;
            this.gen_panel = JSON.parse(data.panel.content);
            console.log(this.gen_panel);
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.posible = false;
      });
  }

}
