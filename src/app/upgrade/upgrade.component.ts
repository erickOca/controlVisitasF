import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'app/model/prestamo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  isDivVisible = false;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.obtenerPrestamos();
  }
  baseUrl = 'http://localhost:8080/Prestamo'; // Reemplaza con la URL correcta de tu API
  prestamoRequest = {
    nombre: '',
    matriculaEst: '',
    tituloLibro: '',
    empleadoPresta: ''
  };
  prestamos: Prestamo[] = [];
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];

  consumirServicio() {
    this.http.post<any>(`${this.baseUrl}/nuevoprestamo`, this.prestamoRequest).subscribe(
      (response) => {
        console.log('Respuesta del servicio:', response);

        if (response === 'Book is not available for loan') {
          this.mostrarAlertaLibroNoDisponible();
        } else {
          this.mostrarAlertaExitosa();
          window.location.reload();
        }
      },
      (error) => {
        console.error('Error al consumir el servicio:', error);
        this.mostrarAlertaError();
      }
    );
  }

  mostrarAlertaExitosa() {
    Swal.fire('Éxito', 'Préstamo agregado correctamente', 'success');
  }

  mostrarAlertaLibroNoDisponible() {
    Swal.fire('Advertencia', 'El libro no está disponible para préstamo', 'warning');
  }

  mostrarAlertaError() {
    Swal.fire('Error', 'No se pudo agregar el préstamo', 'error');
  }

  obtenerPrestamos() {
    this.http.get<Prestamo[]>(`${this.baseUrl}/todoslosprestamos`).subscribe(
      (response) => {
        this.prestamos = response;
      },
      (error) => {
        console.error('Error al obtener los préstamos:', error);
      }
    );
  }
  confirmarEliminarPrestamo(idPrestamo: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el préstamo de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarPrestamo(idPrestamo);
      }
    });
  }

  eliminarPrestamo(idPrestamo: number) {
    this.http.delete(`${this.baseUrl}/eliminar/${idPrestamo}`, { responseType: 'text' }).subscribe(
      () => {
        this.obtenerPrestamos(); // Actualizar la lista después de eliminar
        Swal.fire('Éxito', 'Préstamo eliminado exitosamente', 'success');
      },
      (error) => {
        console.error('Error al eliminar el préstamo:', error);
        Swal.fire('Error', 'No se pudo eliminar el préstamo', 'error');
      }
    );
  }
  
}