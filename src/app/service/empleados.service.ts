import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carreras } from 'app/model/carreras';
import { Empleados } from 'app/model/empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl: string = "http://localhost:8080/Empleado/";
  private baseUr: string = "http://localhost:8080/reportes/";


 constructor(private httpClient: HttpClient) { }

 getAllEmpleado(): Observable< Empleados[]> {
  return this.httpClient.get<Empleados[]>(this.baseUrl + "GetEmpleado")
}
getAllCarrera(): Observable<Carreras[]> {
  return this.httpClient.get<Carreras[]>(this.baseUr + "MostrarCarreras")
}
}
