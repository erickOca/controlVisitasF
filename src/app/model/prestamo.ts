export interface Prestamo {
    idPrestamo: number;
    nombre: string;
    matriculaEst: string;
    fechaPrestamo: string; // Asegúrate de manejar las fechas correctamente
    fechaDevolucion: string; // Asegúrate de manejar las fechas correctamente
    libro: Libro;
    empleadoPresta: string;
  }