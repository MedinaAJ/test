import { Component, OnInit } from '@angular/core';
import { InstalacionesService } from 'src/app/services/instalaciones.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PanelService } from '../../../../../services/panel.service';
import { ConexionexternaService } from '../../../../../services/conexionexterna.service';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { PopupwidgetComponent } from 'src/app/components/aux2/popupwidget/popupwidget.component';
import { Widget } from '../../../../aux2/popupwidget/widget';

@Component({
  selector: 'app-editar-panel',
  templateUrl: './editar-panel.component.html',
  styleUrls: ['./editar-panel.component.css']
})
export class EditarPanelComponent implements OnInit {

  widgets_disponibles = [
    {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 1', 'img': '/assets/img/graficas/grafico.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
    {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 2', 'img': '/assets/img/graficas/estadistica.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
    {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 3', 'img': '/assets/img/graficas/grafico-de-lineas.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
    {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 4', 'img': '/assets/img/graficas/analitica.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
    {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 5', 'img': '/assets/img/graficas/grafico.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'}
  ];

  public instalacion: any;
  public panel: any;

  public gen_panel: any;

  constructor(
    private instalacionesService: InstalacionesService,
    private panelService: PanelService,
    private conexionexternaService: ConexionexternaService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.panel = {};
    this.gen_panel = {};
    this.gen_panel.config = {};
    this.gen_panel.config.conexiones = [];
    
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.panelService.obtener_panel(id)
      .then( data => {
        console.log(data);
        if( data.panel.content == "" ) {
          this.InicializarPanel();
        } else {
          this.panel = data.panel;
          this.gen_panel = JSON.parse(data.panel.content);
        }
      })
    });
  }

  InicializarPanel(): void {
    // Por defecto
    this.gen_panel.config.conexiones.push({'credenciales': {}, 'test': 'Nunca se ha probado', 'tablas_conexion': [], 'campos': {'tablas': [{'name': 'Tabla 1', 'columnas': [{}]}]}});
    this.gen_panel.tabs = [];
    this.recuperarIdPanel();
  }

  guardarPanel(): void {
    this.panel.content = JSON.stringify(this.gen_panel);
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.panel.id = id;
      this.editarPanel();
    });
  }

  editarPanel(): void {
    this.panelService.actualizarPanel(this.panel) 
    .then( data => {
      this.router.navigate(['/admin/instalaciones']);
      this._snackBar.open("El panel se ha editado correctamente", "cerrar", {
        duration: 2000,
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  configurarWidget(widget: any) {
    console.log(widget);
    const dialogRef = this.dialog.open(PopupwidgetComponent, {
      //width: '250px',
      data: {widget, conexiones: this.gen_panel.config.conexiones}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      widget = result.widget;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log("Datos elemento movido");
    //console.log(event.previousContainer.data);
    //console.log("Datos contenedor inicio");
    //console.log(event.previousContainer);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
    }

    this.widgets_disponibles = [
      {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 1', 'img': '/assets/img/graficas/grafico.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
      {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 2', 'img': '/assets/img/graficas/estadistica.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
      {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 3', 'img': '/assets/img/graficas/grafico-de-lineas.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
      {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 4', 'img': '/assets/img/graficas/analitica.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'},
      {'config': {}, 'ejey': {'conexion': [{'index': -1}]}, 'name': 'Widget 5', 'img': '/assets/img/graficas/grafico.svg', 'tipo': 1, 'defaultview': '/assets/img/graficas/grafico.svg'}
    ];
  }

  removeWidget(widget: any, widgets: any): void {
    const index: number = widgets.indexOf(widget);
    widgets.splice(index, 1);
  }

  testConexion(conexion: any) {
    this.conexionexternaService.test_conexion(conexion.credenciales)
    .then( data => {
      conexion.test = data.message;

      if( data.datos_tablas ) {
        conexion.tablas_conexion = [];

        for (var i = 0; i < data.datos_tablas[0].length; i++) {
          conexion.tablas_conexion.push(data.datos_tablas[0][i]['Tables_in_'+conexion.credenciales.namedb]);
        }
      }
    })
    .catch( err => {
      console.log(err);
    });
  }

  addColumnaTabla(conexion: any, tabla: any) {
    const index_con: number = this.gen_panel.config.conexiones.indexOf(conexion);
    if (index_con !== -1) {
      const index_tab: number = this.gen_panel.config.conexiones[index_con].campos.tablas.indexOf(tabla);
      if (index_tab !== -1) {
        this.gen_panel.config.conexiones[index_con].campos.tablas[index_tab].columnas.push({});
      }
    }
  }

  removeColumnaTabla(conexion: any, tabla: any, columna: any) {
    const index_con: number = this.gen_panel.config.conexiones.indexOf(conexion);
    if (index_con !== -1) {
      const index_tab: number = this.gen_panel.config.conexiones[index_con].campos.tablas.indexOf(tabla);
      if (index_tab !== -1) {
        const index_col: number = this.gen_panel.config.conexiones[index_con].campos.tablas[index_tab].columnas.indexOf(columna);
        if(this.gen_panel.config.conexiones[index_con].campos.tablas[index_tab].columnas.length > 1)
          this.gen_panel.config.conexiones[index_con].campos.tablas[index_tab].columnas.splice(index_col, 1);
      }
    }
  }

  addConexion() {
    this.gen_panel.config.conexiones.push({'credenciales': {}, 'test': 'Nunca se ha probado', 'tablas_conexion': [], 'campos': {'tablas': [{'name': 'Tabla 1', 'columnas': [{}]}]}});
  }

  removeConexion(conexion: any) {
    const index_con: number = this.gen_panel.config.conexiones.indexOf(conexion);
    this.gen_panel.config.conexiones.splice(index_con, 1);
  }

  addTabla(conexion: any) {
    const index_con: number = this.gen_panel.config.conexiones.indexOf(conexion);
    if (index_con !== -1) {
      var tabla: any = {};
      tabla.name = 'Tabla ' + (this.gen_panel.config.conexiones[index_con].campos.tablas.length + 1);
      tabla.columnas = [{}];
      this.gen_panel.config.conexiones[index_con].campos.tablas.push(tabla);
    }
  }
  
  removeTabla(tabla: any, conexion: any) {
    const index_con: number = this.gen_panel.config.conexiones.indexOf(conexion);
    if (index_con !== -1) {
      const index_tab: number = this.gen_panel.config.conexiones[index_con].campos.tablas.indexOf(tabla);
      if (index_tab !== -1) {
        this.gen_panel.config.conexiones[index_con].campos.tablas.splice(index_tab, 1);
      }
    }
  }

  addTab() {
    var posible = false;
    for(var i = 0; i < this.gen_panel.config.conexiones.length; i++) {
      if( this.gen_panel.config.conexiones[i].tablas_conexion.length > 0 ) {
        posible = true;
      }
    }
    if( posible ) {
      var tab: any = {};
      tab.name = 'Pestaña ' + (this.gen_panel.tabs.length + 1);
      tab.content_grid = {};
      tab.grid_config = {};
      tab.grid_config.ncol1 = 4;
      tab.grid_config.ncol2 = 4;
      tab.grid_config.ncol3 = 4;
      tab.grid_config.col1 = this.col1;
      tab.grid_config.col2 = this.col2;
      tab.grid_config.col3 = this.col3;
      tab.content_grid.columna1 = {'widgets': []};
      tab.content_grid.columna2 = {'widgets': []};
      tab.content_grid.columna3 = {'widgets': []};
      this.gen_panel.tabs.push(tab);
    } else {
      this._snackBar.open("Debes conectarte primero a una base de datos", "cerrar", {
        duration: 2000,
      });
    }
  }
  
  removeTab(tab: any) {
    const index: number = this.gen_panel.tabs.indexOf(tab);
    if (index !== -1){
      this.gen_panel.tabs.splice(index, 1);
    }
  }

  recuperarIdPanel() {
    this.route.params.forEach((params: Params) => {
			let id = params['id'];
      this.panel.id = id;
      this.recuperarDatosPanel();
    });
  }

  recuperarDatosPanel() {
    this.panelService.obtener_panel(this.panel.id)
      .then( data => {
        let id = this.panel.id;
        this.panel = data.panel;
        this.panel.id = id;
        this.recuperarDatosInstalacion();
      })
      .catch( err => {
        console.log(err);
      });
  }

  recuperarDatosInstalacion() {
    this.instalacionesService.obtener_instalacion_id_panel(this.panel.id)
      .then( data => {
        this.instalacion = data.instalacione;
      })
      .catch( err => {
        console.log(err);
      });
  }

  private ncol1 = 4;
  private ncol2 = 4;
  private ncol3 = 4;

  public col1 = ['col-lg-'+this.ncol1, 'col-md-'+this.ncol1, 'col-sm-'+this.ncol1, 'col-xs-'+this.ncol1];
  public col2 = ['col-lg-'+this.ncol2, 'col-md-'+this.ncol2, 'col-sm-'+this.ncol2, 'col-xs-'+this.ncol2];
  public col3 = ['col-lg-'+this.ncol3, 'col-md-'+this.ncol3, 'col-sm-'+this.ncol3, 'col-xs-'+this.ncol3];

  masCol(columna: number, tipo: number, tab: any): void {

    if (columna == 1 ) {
      if ( tab.grid_config.ncol2 > 2 ) {
        tab.grid_config.ncol1++;
        tab.grid_config.ncol2--;
      }
    } else if ( columna == 2 ) {
      if( tipo == 0 ) {
        if ( tab.grid_config.ncol3 > 2 ) {
          tab.grid_config.ncol2++;
          tab.grid_config.ncol3--;
        }
      } else if ( tipo == 1 ) {
        if ( tab.grid_config.ncol1 > 2 ) {
          tab.grid_config.ncol2++;
          tab.grid_config.ncol1--;
        }
      }
    } else if ( columna == 3 ) {
      if ( tab.grid_config.ncol2 > 2 ) {
        tab.grid_config.ncol3++;
        tab.grid_config.ncol2--;
      }
    }

    tab.grid_config.col1 = ['col-lg-'+tab.grid_config.ncol1, 'col-md-'+tab.grid_config.ncol1, 'col-sm-'+tab.grid_config.ncol1, 'col-xs-'+tab.grid_config.ncol1];
    tab.grid_config.col2 = ['col-lg-'+tab.grid_config.ncol2, 'col-md-'+tab.grid_config.ncol2, 'col-sm-'+tab.grid_config.ncol2, 'col-xs-'+tab.grid_config.ncol2];
    tab.grid_config.col3 = ['col-lg-'+tab.grid_config.ncol3, 'col-md-'+tab.grid_config.ncol3, 'col-sm-'+tab.grid_config.ncol3, 'col-xs-'+tab.grid_config.ncol3];
  }

  menosCol(columna: number, tipo: number, tab: any): void {
    if (columna == 1 ) {
      if ( tab.grid_config.ncol1 > 2 ) {
        tab.grid_config.ncol1--;
        tab.grid_config.ncol2++;
      }
    } else if ( columna == 2 ) {
      if( tipo == 0 ) {
        if ( tab.grid_config.ncol2 > 2 ) {
          tab.grid_config.ncol2--;
          tab.grid_config.ncol3++;
        }
      } else if ( tipo == 1 ) {
        if ( tab.grid_config.ncol2 > 2 ) {
          tab.grid_config.ncol2--;
          tab.grid_config.ncol1++;
        }
      }
    } else if ( columna == 3 ) {
      if ( tab.grid_config.ncol3 > 2 ) {
        tab.grid_config.ncol3--;
        tab.grid_config.ncol2++;
      }
    }
    tab.grid_config.col1 = ['col-lg-'+tab.grid_config.ncol1, 'col-md-'+tab.grid_config.ncol1, 'col-sm-'+tab.grid_config.ncol1, 'col-xs-'+tab.grid_config.ncol1];
    tab.grid_config.col2 = ['col-lg-'+tab.grid_config.ncol2, 'col-md-'+tab.grid_config.ncol2, 'col-sm-'+tab.grid_config.ncol2, 'col-xs-'+tab.grid_config.ncol2];
    tab.grid_config.col3 = ['col-lg-'+tab.grid_config.ncol3, 'col-md-'+tab.grid_config.ncol3, 'col-sm-'+tab.grid_config.ncol3, 'col-xs-'+tab.grid_config.ncol3];
  }
}
