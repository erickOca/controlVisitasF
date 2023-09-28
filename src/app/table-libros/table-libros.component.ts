import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-libros',
  templateUrl: './table-libros.component.html',
  styleUrls: ['./table-libros.component.css']
})
export class TableLibrosComponent implements OnInit {

  libros: any[] = [];
  busquedaTitulo: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    // Reemplaza 'URL_DEL_SERVICIO' con la URL de tu servicio REST
    this.http.get<any[]>('http://localhost:8080/libros').subscribe((data) => {
      this.libros = data;
    });
  }
  buscarLibros() {
    if (this.busquedaTitulo.trim() !== '') {
      // Mostrar la alerta de "Buscando" con la opción allowOutsideClick: false
      Swal.fire({
        title: 'Buscando',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Realiza una solicitud HTTP para buscar libros por título usando el valor del campo de búsqueda
      this.http.get<any[]>(`http://localhost:8080/libros/buscar?Titulo=${this.busquedaTitulo}`).subscribe(
        (data) => {
          this.libros = data;
          // Cierra la alerta una vez que se obtienen los resultados
          Swal.close();
        },
        (error) => {
          // Manejar errores de búsqueda si es necesario
          console.error('Error al buscar libros:', error);
          // Cierra la alerta en caso de error
          Swal.close();
        }
      );
    } else {
      // Si el campo de búsqueda está vacío, obtén todos los libros nuevamente
      this.obtenerLibros();
    }
  }
 
}