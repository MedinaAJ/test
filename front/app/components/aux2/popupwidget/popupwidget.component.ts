import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Widget } from './widget';

@Component({
  selector: 'app-popupwidget',
  templateUrl: './popupwidget.component.html',
  styleUrls: ['./popupwidget.component.css']
})
export class PopupwidgetComponent {

  public conexion_seleccionada: boolean;
  public tabla_seleccionada: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupwidgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.conexion_seleccionada = false;
      this.tabla_seleccionada = false;
      //console.log("LLEGA");
      //console.log(this.data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectTest() {
    //console.log("LLEGA");
    //console.log(this.data);
  }

  addEje(): void {
    this.data.widget.ejey.conexion.push({'index': -1});
  }

  removeEje( element ): void {
    if ( this.data.widget.ejey.conexion.length > 1 ) {
      const index: number = this.data.widget.ejey.conexion.indexOf(element);
      this.data.widget.ejey.conexion.splice(index, 1);
    }
  }

}