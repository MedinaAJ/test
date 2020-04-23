import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GruposService } from '../../../../../services/grupos.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-ver-grupo',
  templateUrl: './ver-grupo.component.html',
  styleUrls: ['./ver-grupo.component.css']
})
export class JefeVerGrupoComponent implements OnInit {

  private name: string;
  private grupos:any={};
  private identity: any = {};
  
  public columnas_plantillas: String[] = ['name'];
  public nombre_columnas_plantillas: String[] = ['Nombre'];
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

    // Cargar lista de plantillas
    this.grupoService.obtener_lista_plantillas_grupos(id)
      .then(response => {
        if(response.templates.length > 0)
          this.datos_plantillas = response.templates;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteGroup() {
    this.grupoService.eliminar_grupo(this.grupos.id) 
    .then( data => {
      this._snackBar.open("Grupo eliminado correctamente.", "cerrar", {
        duration: 2000,
      });
      this._router.navigate(['/jefe/formularios']);
    })
    .catch( err => {
      console.log(err);
      this._snackBar.open("Error al eliminar el grupo", "cerrar", {
        duration: 2000,
      });
    })
  }

}

