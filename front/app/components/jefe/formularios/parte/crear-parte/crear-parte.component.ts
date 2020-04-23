import { Component, OnInit } from '@angular/core';
import { ParteService } from '../../../../../services/parte.service';
import { UserService } from '../../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EmpresaService } from '../../../../../services/empresa.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormulariosService } from '../../../../../services/formularios.service';
import { PlantillaService } from 'src/app/services/plantilla.service';


@Component({
  selector: 'app-crear-parte',
  templateUrl: './crear-parte.component.html',
  styleUrls: ['./crear-parte.component.css']
})
export class JefeCrearParteComponent implements OnInit {

  parte: any = {nombre_obra: ''};
  usuarios_activos: any;
  plantillas_ultima_version: any;
  plantilla_seleccionada;
  grupos_disponibles: any;

  options = [/*"Option 1", "Option 2", "Option 3", "Option 4", "Option 5"*/];
  selected = [];

  private empresa:any = {};
  private identity: any = {};

  constructor(
    private templateService: ParteService,
    private plantillasService: PlantillaService,
    private authService: AuthService,
    private formulariosService: FormulariosService,
    private empresaService: EmpresaService,
    private userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.identity = authService.getIdentity();
   }

  ngOnInit() {

    this.empresaService.obtenerNombreEmpresaEmpleado(this.identity.id)
    .then( data => {
      this.empresa = data.data[0];
      this.cargarUsuarios();
      this.loadGroups();
      this.parte.id_empresa = this.empresa.id;
    })
    .catch( err => {
      console.log(err);
    });
  }

  loadGroups() {
    const grupos_cargados = this.plantillasService.obtener_lista_grupos(this.empresa.id);
    const result = Promise.resolve(grupos_cargados);
    result.then( result => {
      this.grupos_disponibles = result.grupos;
      //console.log("GRUPOS");
      //console.log(this.grupos_disponibles);
      
      for (var i = 0;  i < result.grupos.length; i++) {
        this.grupos_disponibles[i].plantillas = [];
        this.cargarPlantillas(result.grupos[i].id, i);
      }
    });

  }

  cargarPlantillas(id, index) {

    this.formulariosService.obtener_lista_plantillas_por_grupo(this.empresa.id, id)
      .then(response => {
        //console.log("PLANTILLAS GRUPOS");
       // console.log(response);
        this.plantillas_ultima_version = response.plantillas;
        this.grupos_disponibles[index].plantillas = response.plantillas;
      })
      .catch(error => {
        console.log(error);
      });

  }

  cargarUsuarios() {
    // Cargar las plantillas del usuario activo y si son del jefe de toda la peña que tenga a su cargo
    this.userService.obtener_lista_usuarios_por_empresa(this.empresa.name)
    .then( usuarios => {     
      this.usuarios_activos = usuarios.data;
      for( var i = 0; i < this.usuarios_activos.length; i++){
        this.options.push(this.usuarios_activos[i].email);
      }
    })
    .catch( err => {
      console.log(err);
    });
  }

  test () {
    console.log(this.parte.fecha_vencimiento);
  }

  createPart() {

    var index = this.plantillas_ultima_version.map(function(e) { return e.id; }).indexOf(this.plantilla_seleccionada);

    this.parte.id_plantilla = this.plantilla_seleccionada;
    this.parte.version = this.plantillas_ultima_version[index].version;
    this.parte.jefe_mando = this.identity.email;


    var ids_usuarios = [];
    var j;
    for(var i = 0; i < this.selected.length; i++) {
      j = this.usuarios_activos
        .map(function(e) { return e.email; }).indexOf(this.selected[i]);
      ids_usuarios.push( this.usuarios_activos[j].id );
    }

    let data: any = {parte: '', usuarios: ''};
    data.parte = this.parte;
    data.usuarios = ids_usuarios;

    this.templateService.crear_parte( data )
      .then( parte => {
        this._snackBar.open("Parte creado y asignado a los usuarios.", "cerrar", {
          duration: 2000,
        });
        this._router.navigate(['/jefe/formularios']);
      })
      .catch( err => {
        console.log(err);
      });
  }

}

