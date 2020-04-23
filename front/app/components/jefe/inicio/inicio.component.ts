import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioJefeComponent implements OnInit {

  private identity: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.identity = this.authService.getIdentity();
  }

}
