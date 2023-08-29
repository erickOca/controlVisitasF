import { Component, OnInit } from '@angular/core';
import { Empleados } from 'app/model/empleados';
import { EmpleadosService } from 'app/service/empleados.service';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    isDivVisible = false;
listEmpleados: Empleados[] = [];
  constructor(private empleadoService: EmpleadosService) { }

  ngOnInit() {
    this.empleadoService.getAllEmpleado().subscribe((data) => {
        this.listEmpleados = data;
    })
    }
}

