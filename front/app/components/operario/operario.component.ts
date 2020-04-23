import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JefeService } from 'src/app/services/jefe.service';

@Component({
  selector: 'app-operario',
  templateUrl: './operario.component.html',
  styleUrls: ['./operario.component.css']
})
export class OperarioComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  private empresa: any = {};
    private letra; 

    public color = "#666666";
    public jefe: boolean;
    private employee: any = {};

  constructor(
    private _auth : AuthService,
    private _router : Router,
    private jefeService: JefeService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.employee = JSON.parse(localStorage.getItem('identity_user'));
      if(this.employee.id_profile == 3){
        this.jefe = true;
      }
      else{
        this.jefe = false;
      }
      this.letra = this.employee.firstname.substring(0,1);
      this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    this.jefeService.obtenerEmpresa(this.employee.id) 
    .then( data => {
      this.empresa = data.data[0];
    })
    .catch( err => {
      console.log(err);
    });
  }

  
  logout(){
	  this._auth.logOut();
	  this._router.navigate(['/']);
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}
];