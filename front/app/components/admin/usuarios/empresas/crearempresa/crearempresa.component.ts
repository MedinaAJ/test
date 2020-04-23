import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GLOBAL } from '../../../../../services/global';
import { ImageService } from '../../../../../services/image.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-crearempresa',
  templateUrl: './crearempresa.component.html',
  styleUrls: ['./crearempresa.component.css']
})
export class CrearempresaComponent implements OnInit {
  public empresa: any = {};
  public jefe;
  public url;

  @ViewChild('logo', {static: false}) logo;
  @ViewChild('banner', {static: false}) banner;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private imageService: ImageService,
    private empresaService: EmpresaService
  ) {
    this.empresa.color_active = '#000000';
    this.empresa.color_back = '#ffffff';
   }

  ngOnInit() {
    this.url = GLOBAL.url;
  }

  /* Acciones de usuario */ 
  crearEmpresa(){

    this.empresaService.crear_empresa(this.empresa)
	  .then(response => {
      this._snackBar.open("Empresa creada correctamente.", "cerrar", {
        duration: 2000,
      });
      this._router.navigate(['/admin/usuarios']);
	  })
	  .catch(error => {
     console.log(error);
     this._snackBar.open("Error al crear la empresa", "cerrar", {
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

