import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Areas } from 'app/model/areas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl: string = "http://localhost:8080/reportes/";

  constructor(private httpClient: HttpClient) { }

  getGlobalArea(): Observable<Areas[]> {
    return this.httpClient.get<Areas[]>(this.baseUrl + "ContarVisitasPorArea")
  }

  showByRangeFecha(fechaInicio: String, fechaFin: String): Observable<any[]> {
    const url = `${this.baseUrl}getByFecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    return this.httpClient.get<any[]>(url);
  }
}
