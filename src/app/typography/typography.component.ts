import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  fechaInicio: string;
  fechaFin: string;
  resultados: any[];
  saleData: any[] = []
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  buscar() {
    const request = {
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFin
    };

    const url = 'http://localhost:8080/reportes/ContarPersonalArea'; // Reemplaza con la URL real del servicio

    this.http.post(url, request).subscribe(
      (response: any) => {
        this.resultados = response;
        console.log("Resultados " + response);
        this.procesarDatosParaGrafica();

      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }
  
  procesarDatosParaGrafica() {
    // Aquí debes procesar los datos para que se ajusten al formato requerido por ngx-charts-bar-vertical
    this.saleData = this.resultados.map((item) => {
      return {
        name: item.nombreArea, // Cambia por la propiedad que contiene el nombre del área
        value: item.visitas // Cambia por la propiedad que contiene la cantidad
      };
    });
  }

}

