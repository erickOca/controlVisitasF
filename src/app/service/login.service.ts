import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = "http://localhost:8080/user/";

  constructor(private http: HttpClient) { }

  getAlumnoByMatricula(matricula: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/alumnos/${matricula}`);
  }

  buscarMatricula(matricula: string, opcion: string, motivo: string): Observable<any> {
    const body = { opcion, motivo };
    return this.http.post(`${this.baseUrl}/FindByAlumno/${matricula}`, body);
  }
}
