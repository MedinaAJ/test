import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { GruposService } from '../../../../../services/grupos.service';
import { AuthService } from '../../../../../services/auth.service';
import { EmpresaService } from '../../../../../services/empresa.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class JefeCrearGrupoComponent implements OnInit {

  private name: string;
  private grupos:any={};
  private identity: any = {};
  empresa: any = {};

  constructor(private grupoService: GruposService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private empresaService: EmpresaService,
              private _route: ActivatedRoute) 
              { 
                this.identity = this.authService.getIdentity();
              }

  ngOnInit() {

    this.empresaService.obtenerNombreEmpresaEmpleado(this.identity.id)
    .then(resp => {
      this.empresa = resp.data[0];
      this.grupos.id_empresa = this.empresa.id;
    })
    .catch(err => {
      console.log(err);
    });
  }

  createGroup(){    
    this.grupos.name = this.name;
    this.grupoService.crear_grupo(this.grupos)
      .then(response => {
        this._snackBar.open("Grupo creado correctamente.", "cerrar", {
          duration: 2000,
        });
        this._router.navigate(['/jefe/formularios']);
      })
      .catch(error => {
        console.log(error);
        this._snackBar.open("Error al crear el grupo", "cerrar", {
          duration: 2000,
        });
    });
  }

}
