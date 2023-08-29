import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  fechaInicio: Date;
  fechaFin: Date;
  resultados: ExternoResponse[] = [];
  chartData: any[];
  constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  buscar() {
    const request = {
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFin,
    };
  
    this.http.post<ExternoResponse[]>('http://localhost:8080/reportes/ContarVisExArea', request)
      .subscribe(response => {
        this.resultados = response;
  
        // Transformar datos para la gráfica
        const chartData = this.resultados.map(resultado => {
          return {
            name: resultado.nombre,
            value: resultado.visitas
          };
        });
  
        this.chartData = chartData; // Agregar la propiedad chartData
      });
  }
}