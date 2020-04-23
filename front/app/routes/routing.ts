import { GuardService } from './../services/guard.service';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './../components/login/login.component';
import { AdminComponent } from './../components/admin/admin.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { InicioComponent } from '../components/admin/inicio/inicio.component';
import { JefeComponent } from '../components/jefe/jefe.component';
import { OperarioComponent } from '../components/operario/operario.component';
import { UsuariosComponent } from '../components/admin/usuarios/usuarios.component';
import { InstalacionesComponent } from '../components/admin/instalaciones/instalaciones.component';
import { CrearusuarioComponent } from '../components/admin/usuarios/usuarios/crearusuario/crearusuario.component';
import { CrearempresaComponent } from '../components/admin/usuarios/empresas/crearempresa/crearempresa.component';
import { EditarusuarioComponent } from '../components/admin/usuarios/usuarios/editarusuario/editarusuario.component';
import { EditarempresaComponent } from '../components/admin/usuarios/empresas/editarempresa/editarempresa.component';
import { UsuariosJefeComponent } from '../components/jefe/usuarios/usuarios.component';
import { InstalacionesJefeComponent } from '../components/jefe/instalaciones/instalaciones.component';
import { FormulariosJefeComponent } from '../components/jefe/formularios/formularios.component';
import { InicioJefeComponent } from '../components/jefe/inicio/inicio.component';
import { JefeEditarUsuarioComponent } from '../components/jefe/usuarios/editar-usuario/editar-usuario.component';
import { JefeEditarGrupoComponent } from '../components/jefe/formularios/grupo/editar-grupo/editar-grupo.component';
import { JefeCrearGrupoComponent } from '../components/jefe/formularios/grupo/crear-grupo/crear-grupo.component';
import { JefeVerGrupoComponent } from '../components/jefe/formularios/grupo/ver-grupo/ver-grupo.component';
import { JefeEditarParteComponent } from '../components/jefe/formularios/parte/editar-parte/editar-parte.component';
import { JefeCrearParteComponent } from '../components/jefe/formularios/parte/crear-parte/crear-parte.component';
import { JefeVerParteComponent } from '../components/jefe/formularios/parte/ver-parte/ver-parte.component';
import { JefeEditarPlantillaComponent } from '../components/jefe/formularios/plantilla/editar-plantilla/editar-plantilla.component';
import { JefeCrearPlantillaComponent } from '../components/jefe/formularios/plantilla/crear-plantilla/crear-plantilla.component';
import { JefeVerPlantillaComponent } from '../components/jefe/formularios/plantilla/ver-plantilla/ver-plantilla.component';
import { InstalacionesOperarioComponent } from '../components/operario/instalaciones/instalaciones.component';
import { FormulariosOperarioComponent } from '../components/operario/formularios/formularios.component';
import { OperarioVerParteComponent } from '../components/operario/formularios/ver-formulario/ver-formulario.component';
import { OperarioEditarParteComponent } from '../components/operario/formularios/editar-formulario/editar-formulario.component';
import { InicioOperarioComponent } from '../components/operario/inicio/inicio.component';
import { PrevisualizarPlantillaComponent } from '../components/jefe/formularios/plantilla/previsualizar-plantilla/previsualizar-plantilla.component';

import { CrearInstalacionComponent } from '../components/admin/instalaciones/crear-instalacion/crear-instalacion.component';
import { EditarInstalacionComponent } from '../components/admin/instalaciones/editar-instalacion/editar-instalacion.component';
import { EditarPanelComponent } from '../components/admin/instalaciones/panel/editar-panel/editar-panel.component';
import { VerPanelComponent } from '../components/admin/instalaciones/panel/ver-panel/ver-panel.component';




const app_routes: Routes = [
    { path: '', component: LoginComponent },
    
    { path: 'admin', component: AdminComponent, canActivate:[GuardService],
        children: [
            {path: 'inicio', component: InicioComponent},

            { path: 'usuarios/crear-usuario', component: CrearusuarioComponent },
            { path: 'usuarios/editar-usuario/:id', component: EditarusuarioComponent },
            { path: 'usuarios/crear-empresa', component: CrearempresaComponent },
            { path: 'usuarios/editar-empresa/:id', component: EditarempresaComponent },

            {path: 'usuarios', component: UsuariosComponent },
            {path: 'instalaciones', component: InstalacionesComponent},
            { path: 'instalaciones/crear-instalacion', component: CrearInstalacionComponent },
            { path: 'instalaciones/editar-instalacion/:id', component: EditarInstalacionComponent },
            { path: 'instalaciones/editar-panel/:id', component: EditarPanelComponent },
            { path: 'instalaciones/ver-panel/:id', component: VerPanelComponent }
        ]
    },
    { path: 'jefe', component: JefeComponent, canActivate:[GuardService], 
        children: [
            {path: '', component: InicioJefeComponent},
            {path: 'inicio', component: InicioJefeComponent},

            { path: 'usuarios/editar-usuario/:id', component: JefeEditarUsuarioComponent },

            {path: 'usuarios', component: UsuariosJefeComponent },
            {path: 'instalaciones', component: InstalacionesJefeComponent},

            { path: 'formularios/editar-grupo/:id', component: JefeEditarGrupoComponent },
            { path: 'formularios/crear-grupo', component: JefeCrearGrupoComponent },
            { path: 'formularios/ver-grupo/:id', component: JefeVerGrupoComponent },

            { path: 'formularios/editar-parte/:id', component: JefeEditarParteComponent },
            { path: 'formularios/crear-parte', component: JefeCrearParteComponent },
            { path: 'formularios/ver-parte/:id', component: JefeVerParteComponent },

            { path: 'formularios/editar-plantilla/:id', component: JefeEditarPlantillaComponent },
            { path: 'formularios/crear-plantilla/:name/:grupo/:content/:header/:footer', component: JefeCrearPlantillaComponent },
            { path: 'formularios/crear-plantilla', component: JefeCrearPlantillaComponent },
            { path: 'formularios/ver-plantilla/:id', component: JefeVerPlantillaComponent },
            { path: 'formularios/previsualizar-plantilla/:name/:grupo/:content/:header/:footer', component: PrevisualizarPlantillaComponent },

            {path: 'formularios', component: FormulariosJefeComponent}
        ]
    },
    { path: 'operario', component: OperarioComponent, canActivate: [GuardService], 
        children: [
            {path: '', component: InicioOperarioComponent},
            {path: 'inicio', component: InicioOperarioComponent},
            {path: 'instalaciones', component: InstalacionesOperarioComponent},

            { path: 'formularios/editar-parte/:id', component: OperarioEditarParteComponent },
            { path: 'formularios/ver-parte/:id', component: OperarioVerParteComponent },

            {path: 'formularios', component: FormulariosOperarioComponent}
        ]
	},
    { path: '**', pathMatch: 'full', component: NotfoundComponent}
    // { path:'**', pathMatch:'full', redirectTo:'' }
]

export const AppRouting = RouterModule.forRoot(app_routes);
