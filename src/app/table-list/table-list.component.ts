import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  carreraChartData: any[] = [];
  carreraData: any[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  buscarVisitas() {
    const fechaRequest = {
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFin
    };

    this.http.post<any[]>('http://localhost:8080/reportes/ContarVisitasPorCarrera', fechaRequest).subscribe(
      response => {
        console.log(response); // Verifica la respuesta del servicio

        this.carreraData = response;
        this.carreraChartData = this.carreraData.map(item => {
          return {
            name: item.nombreCarrera,
            value: item.visitas
          };
        });
      },
      error => {
      }
    );
  }

  limpiarFormulario() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.carreraData = [];
  }
}