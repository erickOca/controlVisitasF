import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Areas } from 'app/model/areas';
import { ReportesService } from 'app/service/reportes.service';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  reportArea: Areas[] = [];
  saleData: any[] = []; // Cambia el tipo si es necesario
  fechaInicio: string = '';
  fechaFin: string = '';
  alumnos: number = 0;
  personal: number = 0;
  externos: number = 0;
  totalVisitas: number = 0;
  nivelData: any[] = [];
  nivelDat: any[] = [];
  fechaInicioN: string = '';
  fechaFinN: string = '';
  @ViewChild('chart') chart: ElementRef;

  constructor(private service: ReportesService,private http: HttpClient) { }

  ngOnInit() {
  }
  consumirServicio(): void {
    const url = 'http://localhost:8080/reportes/ContarVisitasGlobal';
    const requestData = {
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFin
    };

    this.http.post(url, requestData).subscribe(
      (response: any) => {
        this.alumnos = response.alumnos;
        this.personal = response.personal;
        this.externos = response.externos;
        this.totalVisitas = response.totalVisitas;
        this.prepararDatosGrafica();

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  limpiarCampos(): void {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.alumnos = 0;
    this.personal = 0;
    this.externos = 0;
    this.totalVisitas = 0;
  }


prepararDatosGrafica(): void {
  // Supongamos que necesitas mostrar las visitas de alumnos, personal y externos
  this.saleData = [
    {
      name: 'Alumnos',
      value: this.alumnos
    },
    {
      name: 'Personal',
      value: this.personal
    },
    {
      name: 'Externos',
      value: this.externos
    }
  ];
}
obtenerVisitasPorNiveles() {
  const fechaRequest = {
    fechaInicioN: this.fechaInicio,
    fechaFinalN: this.fechaFin
  };

  this.http.post<any[]>('http://localhost:8080/reportes/AlumnosNivel', fechaRequest).subscribe(
    response => {
      this.nivelDat = response;
      console.log(response); // Verifica la respuesta del servicio

      this.nivelData = response.map(item => {
        return {
          name: item.nombre,
          value: item.visitasPorCarreta
        };
      });
    },
    error => {
    }
  );
}

limpiarFormulario() {
  this.fechaInicioN = '';
  this.fechaFinN = '';
  this.nivelData = [];
}
}


