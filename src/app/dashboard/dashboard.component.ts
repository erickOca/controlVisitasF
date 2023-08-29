import { Component, OnInit } from '@angular/core';
import { Carreras } from 'app/model/carreras';
import { EmpleadosService } from 'app/service/empleados.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 listCarrera: Carreras[] = [];
 constructor(private empleadoService: EmpleadosService) { }

  ngOnInit() {
     this.empleadoService.getAllCarrera().subscribe((data) => {
      this.listCarrera = data;
     })
  }

}
