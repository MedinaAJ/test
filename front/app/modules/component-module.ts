import {NgModule} from '@angular/core';

import { AdminComponent } from './../components/admin/admin.component';
import { InicioComponent } from './../components/admin/inicio/inicio.component';
import { UsuariosComponent } from './../components/admin/usuarios/usuarios.component';
import { InstalacionesComponent } from './../components/admin/instalaciones/instalaciones.component';
import { CrearusuarioComponent } from './../components/admin/usuarios/usuarios/crearusuario/crearusuario.component';
import { EditarusuarioComponent } from './../components/admin/usuarios/usuarios/editarusuario/editarusuario.component';
import { CrearempresaComponent } from './../components/admin/usuarios/empresas/crearempresa/crearempresa.component';
import { EditarempresaComponent } from './../components/admin/usuarios/empresas/editarempresa/editarempresa.component';

import { JefeComponent } from './../components/jefe/jefe.component';
import { FormulariosJefeComponent } from './../components/jefe/formularios/formularios.component';
import { InicioJefeComponent } from './../components/jefe/inicio/inicio.component';
import { UsuariosJefeComponent } from './../components/jefe/usuarios/usuarios.component';
import { InstalacionesJefeComponent } from './../components/jefe/instalaciones/instalaciones.component';
import { JefeEditarUsuarioComponent } from './../components/jefe/usuarios/editar-usuario/editar-usuario.component';
import { JefeVerParteComponent } from './../components/jefe/formularios/parte/ver-parte/ver-parte.component';
import { JefeCrearParteComponent } from './../components/jefe/formularios/parte/crear-parte/crear-parte.component';
import { JefeEditarParteComponent } from './../components/jefe/formularios/parte/editar-parte/editar-parte.component';
import { JefeEditarPlantillaComponent } from './../components/jefe/formularios/plantilla/editar-plantilla/editar-plantilla.component';
import { JefeCrearPlantillaComponent } from './../components/jefe/formularios/plantilla/crear-plantilla/crear-plantilla.component';
import { JefeVerPlantillaComponent } from './../components/jefe/formularios/plantilla/ver-plantilla/ver-plantilla.component';
import { JefeVerGrupoComponent } from './../components/jefe/formularios/grupo/ver-grupo/ver-grupo.component';
import { JefeCrearGrupoComponent } from './../components/jefe/formularios/grupo/crear-grupo/crear-grupo.component';
import { JefeEditarGrupoComponent } from './../components/jefe/formularios/grupo/editar-grupo/editar-grupo.component';
import { PrevisualizarPlantillaComponent } from './../components/jefe/formularios/plantilla/previsualizar-plantilla/previsualizar-plantilla.component';

import { OperarioComponent } from './../components/operario/operario.component';
import { FormulariosOperarioComponent } from './../components/operario/formularios/formularios.component';
import { OperarioVerParteComponent } from './../components/operario/formularios/ver-formulario/ver-formulario.component';
import { OperarioEditarParteComponent } from './../components/operario/formularios/editar-formulario/editar-formulario.component';
import { InicioOperarioComponent } from './../components/operario/inicio/inicio.component';
import { InstalacionesOperarioComponent } from './../components/operario/instalaciones/instalaciones.component';

import { ListadoComponent } from '../components/aux2/listado/listado.component';
import { SelectCheckAllComponent } from '../components/aux2/checkbox-selector/select-check-all.components';
import { NovedadesComponent } from '../components/aux2/novedades/novedades.component';
import { MonitorizarComponent } from '../components/aux2/monitorizar/monitorizar.component';
import { WidgetComponent } from '../components/aux2/widget/widget.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { AppRouting } from '../routes/routing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material-module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { CrearInstalacionComponent } from '../components/admin/instalaciones/crear-instalacion/crear-instalacion.component';
import { ChartComponent } from '../components/chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    AdminComponent,
    InicioComponent,
    UsuariosComponent,
    InstalacionesComponent,
    CrearInstalacionComponent,
    CrearusuarioComponent,
    CrearempresaComponent,
    EditarempresaComponent,
    JefeComponent,
    OperarioComponent,
    EditarusuarioComponent,
    FormulariosJefeComponent,
    InicioJefeComponent,
    UsuariosJefeComponent,
    InstalacionesJefeComponent,
    JefeEditarUsuarioComponent,
    JefeVerParteComponent,
    JefeCrearParteComponent,
    JefeEditarParteComponent,
    JefeEditarPlantillaComponent,
    JefeCrearPlantillaComponent,
    JefeVerPlantillaComponent,
    JefeVerGrupoComponent,
    JefeCrearGrupoComponent,
    JefeEditarGrupoComponent,
    FormulariosOperarioComponent,
    OperarioVerParteComponent,
    OperarioEditarParteComponent,
    InicioOperarioComponent,
    InstalacionesOperarioComponent,
    PrevisualizarPlantillaComponent,
    NovedadesComponent,
    ListadoComponent,
    SelectCheckAllComponent,
    MonitorizarComponent,
    ChartComponent,
    WidgetComponent
  ],
  exports: [ 
    ListadoComponent,
    SelectCheckAllComponent,
    NovedadesComponent,
    MonitorizarComponent,
    ChartComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
	  BrowserAnimationsModule,
    AppRoutingModule,
	  AppRouting,
	  HttpModule,
    FormsModule,
    MaterialModule,
    GoogleChartsModule.forRoot(),
    ColorPickerModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) 
  ]
})
export class ComponentModule {}