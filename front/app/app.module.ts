import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppRouting } from './routes/routing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


import { ComponentModule } from './modules/component-module';
import { MaterialModule } from './modules/material-module';
import { EditarInstalacionComponent } from './components/admin/instalaciones/editar-instalacion/editar-instalacion.component';
import { EditarPanelComponent } from './components/admin/instalaciones/panel/editar-panel/editar-panel.component';
import { PopupwidgetComponent } from './components/aux2/popupwidget/popupwidget.component';
import { VerPanelComponent } from './components/admin/instalaciones/panel/ver-panel/ver-panel.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,

    EditarInstalacionComponent,
    EditarPanelComponent,
    PopupwidgetComponent,
    VerPanelComponent
   
  ],
  exports: [ 
    
    PopupwidgetComponent
  ],
  entryComponents: [PopupwidgetComponent],
  imports: [
    BrowserModule,
	  BrowserAnimationsModule,
    AppRoutingModule,
	  AppRouting,
	  HttpModule,
    FormsModule,
    MaterialModule,
    ComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
