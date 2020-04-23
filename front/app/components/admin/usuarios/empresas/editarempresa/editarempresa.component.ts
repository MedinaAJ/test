import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GLOBAL } from '../../../../../services/global';
import { ImageService } from '../../../../../services/image.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.css']
})
export class EditarempresaComponent implements OnInit {
  public empresa: any = {};
  public jefe;
  public url; id;
  public datos_usuarios;

  @ViewChild('logo', {static: false}) logo;
  @ViewChild('banner', {static: false}) banner;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private imageService: ImageService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.url = GLOBAL.url;

    this.recuperarIdEmpresa();

   // this._router.navigate(['/admin/usuarios']);
  }

  recuperarIdEmpresa() {
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.empresa.id, this.id = id;
      this.recuperarEmpresa(id);

     this.empresaService.obtener_todos_usuarios_de_empresa(id)
      //this.empresaService.obtener_lista_usuarios_por_empresa(id)
      .then(data => {
        this.datos_usuarios = data;
      })
      .catch(function(err) {
        console.log(err);
      });

    });
  }
  
  recuperarEmpresa(id) {
    this.empresaService.getEmpresa(id)
      .then(data => {
        this.empresa = data.empresa;
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* Acciones de usuario */ 
  editarEmpresa(){

    this.empresaService.editar_empresa(this.empresa)
	  .then(response => {
      this._snackBar.open("Empresa editada correctamente.", "cerrar", {
        duration: 2000,
      });
      this._router.navigate(['/admin/usuarios']);
	  })
	  .catch(error => {
     console.log(error);
     this._snackBar.open("Error al editar la empresa", "cerrar", {
        duration: 2000,
      });
	  });
  }

  colorActivaChangeEvent( event ) {
    this.empresa.color_active = event;
  }

  colorBarraChangeEvent( event ) {
    this.empresa.color_back = event;
  }

  logoSmallChangeEvent( event ) {

    this.imageService.makeFileRequest(this.url+'upload-empresa-logo-small', [], <Array<File>>event.target.files).then(
      (result: any) => {
        this.empresa.logo_small = result.file;
      }
    );

  }

  logoBannerChangeEvent ( event ) {

    this.imageService.makeFileRequest(this.url+'upload-empresa-logo-banner', [], <Array<File>>event.target.files).then(
      (result: any) => {
        this.empresa.logo_banner = result.file;
      }
    );

  }

  removeSmallLogo() {
    this.empresa.logo_small = null;
    this.logo.nativeElement.value = "";
  }

  removeBannerLogo() {
    this.empresa.logo_banner = null;
    this.banner.nativeElement.value = "";
  }

}


