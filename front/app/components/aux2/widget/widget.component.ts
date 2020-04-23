import { Component, OnInit, Input } from '@angular/core';
import { ChartErrorEvent, ChartEvent } from 'angular-google-charts';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input() widget: any;

  public chart: {
    title: string;
    type: string;
    data: Array<Array<string | number | {}>>;
    roles: Array<{ type: string; role: string; index?: number }>;
    columnNames?: Array<string>;
    options?: {};
  };

  constructor() { }

  ngOnInit() {
    /*
      PASOS A SEGUIR:
        0. Construye toda la logica de hacer una peticion a una base de datos externa en el backend y servicio en el front end
        1. Obten todos los datos de cada conexion y agrupalos por fechas y horas, esto va en "data"
        2. Pon en "columnName" los nombres a mostrar de cada columna
        3. Pon en titulo "Graficos lineales"
        4. Haz que el tamaño del style de google chart varie en funcion de la altura del widget
    */

    this.chart = {
      title: 'Styled Line Chart',
      type: 'LineChart',
      columnNames: ['Element', 'Density1', 'Density2'],
      roles: [],
      data: [
        ['April', 1000, 2000],
        ['May', 1170, 1500],
        ['June', 660, 800],
        ['July', 1030, 600]
      ],
      options: {/*
        'width': this.el.nativeElement.offsetHeight,
        'height': this.el.nativeElement.offsetWidth */
      }
    };

  }

  public onReady() {
    console.log('Chart ready');
  }

  public onError(error: ChartErrorEvent) {
    console.error('Error: ' + error.message.toString());
  }

  public onSelect(event: ChartEvent) {
    console.log('Selected: ' + event.toString());
  }

  public onMouseEnter(event: ChartEvent) {
    console.log('Hovering ' + event.toString());
  }

  public onMouseLeave(event: ChartEvent) {
    console.log('No longer hovering ' + event.toString());
  }

}
