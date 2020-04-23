import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GruposService } from '../../../../../services/grupos.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class JefeEditarGrupoComponent implements OnInit {

  private name: string;
  private grupos:any={};
  private identity: any = {};
  
  public columnas_plantillas: String[] = ['id_template', 'version', 'name', 'id_group', 'createdAt'];
  public nombre_columnas_plantillas: String[] = ['Nº', 'Version', 'Nombre', 'Grupo', 'Fecha de creacion'];
  datos_plantillas: any;

  constructor(private grupoService: GruposService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _route: ActivatedRoute) 
              { 
                this.identity = this.authService.getIdentity();
              }

  ngOnInit() {
    this.recuperarGrupo();
  }

  recuperarGrupo() {
    var id;

    // Cargar datos del grupo
    this._route.params.forEach((params: Params) => {
      id = params['id'];			
    });

    this.grupoService.obtener_grupo(id)
      .then(response => {
        this.grupos = response.grupos;
      })
      .catch(error => {
        console.log(error);
      });
  }

  createGroup(){    
    this.grupoService.editar_grupo(this.grupos)
      .then(response => {
        this._snackBar.open("Grupo editado correctamente.", "cerrar", {
          duration: 2000,
        });
        this._router.navigate(['/jefe/formularios']);
      })
      .catch(error => {
        console.log(error);
        this._snackBar.open("Error al editar el grupo", "cerrar", {
          duration: 2000,
        });
    });
  }

}

