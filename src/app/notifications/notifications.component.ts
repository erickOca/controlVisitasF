import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  nuevoLibro = {
    titulo: '',
    autor: '',
    categoria: ''
  };
  libros: Libro[] = [];
  isDivVisible = false;

  constructor(private http: HttpClient){ }

  ngOnInit() {
    this.obtenerTodosLosLibros();
  }

  obtenerTodosLosLibros() {
    this.http.get<Libro[]>('http://localhost:8080/libro/listLibro').subscribe(
      response => {
        this.libros = response;
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  libro() {
    if (!this.nuevoLibro.titulo || !this.nuevoLibro.autor || !this.nuevoLibro.categoria) {
      this.mostrarAlertaCamposVacios();
      return;
    }

    this.http.post<any>('http://localhost:8080/libro/nuevolibro', this.nuevoLibro).subscribe(
      response => {
        console.log('Libro agregado:', response);
        this.mostrarAlertaExitosa();
      },
      error => {
        console.error('Error al agregar libro:', error);
        this.mostrarAlertaError();
      }
    );
  }

  mostrarAlertaCamposVacios() {
    Swal.fire({
      title: 'Campos Vacíos',
      text: 'Por favor, completa todos los campos antes de agregar el libro.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarAlertaExitosa() {
    Swal.fire({
      title: 'Libro Agregado',
      text: 'El libro ha sido agregado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarAlertaError() {
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al agregar el libro.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  borrarLibro(idLibro: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el libro de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:8080/libro/borrarLibro?idLibro=${idLibro}`;

        this.http.delete(url).subscribe(
          (response: any) => {
            console.log('Libro borrado:', response);
            Swal.fire('¡Borrado!', 'El libro ha sido eliminado.', 'success');
          },
          (error: any) => {
            console.error('Error al borrar el libro:', error);
            Swal.fire('Error', 'No se pudo borrar el libro.', 'error');
          }
        );
      }
    });
  }

}