import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ParteService } from '../../../services/parte.service';
import { PlantillaService } from '../../../services/plantilla.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  @Input() datos: any = {};
  @Input() interfaz: string[] = [];
  @Input() titulo: string[] = [];
  @Input() ruta: string;
  @Input() acciones_masivas: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  /*checkbox*/ 
  selection = new SelectionModel<any>(true, []);
  private dataSource: MatTableDataSource<unknown>;
  displayedColumns: String[];

  constructor( private parteService: ParteService, private _serviceTemplate: PlantillaService, private _snackBar: MatSnackBar, private _router: Router ) { }

  ngOnInit() {

    var aux = ['select'];
    aux.push( ...this.interfaz);
    
    this.dataSource = new MatTableDataSource(this.datos);
    this.displayedColumns = aux;
    setTimeout(() => this.dataSource.paginator = this.paginator);

  }
  
  eliminarPartes() {

    var elimina: boolean = false;
    
    for(var i = 0; i < this.selection.selected.length; i++) {
      this.eliminarParte(this.selection.selected[i].id);
      elimina = true;
    }

    if( elimina ) {
      this._router.navigate(['/jefe/formularios']);
      window.location.reload();
    }
  }

  eliminarParte(id: number) {
    this.parteService.eliminar_parte(id)
    .then()
    .catch( err => {
      console.log(err);
      this._snackBar.open("Ocurrio un error al eliminar el parte "+id+".", "cerrar", {
        duration: 2000,
      });
    });
  }

  eliminarPlantillas(): void {

    var elimina: boolean = false;
    
    for(var i = 0; i < this.selection.selected.length; i++) {
      this.eliminarPlantilla(this.selection.selected[i].id_template, this.selection.selected[i].version);
      elimina = true;
    }

    if( elimina ) {
      this._router.navigate(['/jefe/formularios']);
      window.location.reload();
    }
  }

  eliminarPlantilla(id: number, version: number): void {

    this._serviceTemplate.eliminar_plantilla(id, version)
      .then()
      .catch(error => {
        console.log(error);
        this._snackBar.open("Ocurrio un error al eliminar la plantilla "+id+".", "cerrar", {
          duration: 2000,
        });
      });
    
  }

  ejecutarAccion(event) {
    if( event.value == 'delete' ) {
      if( this.acciones_masivas == "partes" ) {
        this.eliminarPartes();
      } else if( this.acciones_masivas == "plantillas" ) {
        this.eliminarPlantillas();
      }
    }
  }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
  }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.posicion + 1}`;
    }

  /*end checkbox*/ 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  esFecha(titulo: string) {
    return titulo.includes('echa'); // Fecha
  }

  castDateFormat(fecha: string) {
    var date = new Date(fecha); // had to remove the colon (:) after the T in order to make it work
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = day+"-"+(monthIndex+1)+"-"+year+" "+ hours+":"+minutes+":"+seconds;

    return myFormattedDate;
  }

  /* Imprimir */

  imprimirListado() {
    html2canvas(document.getElementById("tabla")).then(canvas => {
              
      var pdf = new jsPDF('p', 'pt');
      //var pdf = new jsPDF('p', 'mm', 'a4');

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height); // Margen de la pagina


      pdf.save('listado.pdf');
    });
  }
}
