import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matricula: string = '';
  alumno: any;
  areas: string[] = ['Docente', 'Administrativo','Mantenimiento'];
  opciones = ["Area de Computo", "Area de Biblioteca"]; // Lista de opciones
  constructor(private router: Router,private alumnoService : LoginService,private http: HttpClient) { }

  ngOnInit(): void {
  }
 

  getAlumnoByMatricula() {
    if (this.matricula.trim() === '') {
      Swal.fire('Matrícula inválida', 'Por favor, ingrese una matrícula válida', 'warning');
      return;
    }

    this.http.get(`http://localhost:8080/user/alumnos/${this.matricula}`).subscribe(
      (response) => {
        this.alumno = response;
        this.mostrarSweetAlert();
      },
      (error) => {
        Swal.fire('Error obteniendo alumno', 'Hubo un problema al obtener el alumno', 'error');
      }
    );
  }

  buscarMatricula(opcion: string, motivo: string) {
    const matriculaAlumno = this.matricula;

    this.http
      .post(`http://localhost:8080/user/FindByAlumno/${matriculaAlumno}`, null, {
        params: {
          opcion: opcion,
          motivo: motivo,
        },
      })
      .subscribe(
        (response) => {
          const token = "utrng" + Math.floor(Math.random() * 90000 + 10000);

          Swal.fire('Guardado exitosamente', `Token: ${token}`).then(() => {
            // Recargar la página
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire('Error al guardar', 'Hubo un problema al guardar la información', 'error');
        }
      );
  }

  mostrarSweetAlert() {
    if (this.alumno) {
      Swal.fire({
        title: 'Alumno encontrado',
        html: `
          <div class="form-outline form-white mb-4">
            <select id="opcion" class="form-select form-select-lg" >
              <option value="Area de Computo">Computo</option>
              <option value="Area de Biblioteca">Biblioteca</option>
            </select>
            <label class="form-label" for="opcion">Opción</label>
          </div>
          <div class="form-outline form-white mb-4">
            <input type="text" id="motivo" class="form-control form-control-lg" placeholder="Motivo" />
            <label class="form-label" for="motivo">Motivo</label>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const opcion = (document.getElementById('opcion') as HTMLSelectElement).value;
          const motivo = (document.getElementById('motivo') as HTMLInputElement).value;
          this.buscarMatricula(opcion, motivo);
        },
      });
    } else {
      Swal.fire('Alumno no encontrado', 'No se encontró ningún alumno con la matrícula proporcionada', 'error');
    }
  }




  admin() {
    Swal.fire({
      title: "Inicia Sesión",
      html:
        '<input id="username" class="swal2-input" placeholder="Nombre de usuario">' +
        '<input id="password" class="swal2-input" type="password" placeholder="Contraseña">',
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const username = (<HTMLInputElement>document.getElementById('username')).value;
        const password = (<HTMLInputElement>document.getElementById('password')).value;
        
        return { username: username, password: password };
      }
    })
    .then(resultado => {
      if (resultado.value) {
        const { username, password } = resultado.value;
        if (username === "admin" && password === "admin") {
          // Redirigir a otra ruta
          this.router.navigate(['user-profile']);
        } else {
          Swal.fire("Usuario no válido", "Las credenciales ingresadas son incorrectas", "error");

          console.log("Credenciales incorrectas");
        }
      }
    });
  }
  showExternoForm() {
    Swal.fire({
      title: 'Registrar Externo',
      html: `
        <div class="form-outline form-white mb-4">
          <input type="text" id="nombreInstitucion" class="form-control form-control-lg" placeholder="Nombre de la institución" style="margin-top: 20px;"/>
          <label class="form-label" for="nombreInstitucion">Nombre de la institución</label>
        </div>
        <div class="form-outline form-white mb-4">
        <select id="opcion" class="form-select form-select-lg">
        <option value="Area de Computo">Computo</option>
        <option value="Area de Biblioteca">Biblioteca</option>
      </select>
      <label class="form-label" for="opcion">Opción</label>
        </div>
        <div class="form-outline form-white mb-4">
          <input type="text" id="motivo" class="form-control form-control-lg" placeholder="Motivo" />
          <label class="form-label" for="motivo">Motivo</label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombreInstitucion = (document.getElementById('nombreInstitucion') as HTMLInputElement).value;
        const opcion = (document.getElementById('opcion') as HTMLSelectElement).value;
        const motivo = (document.getElementById('motivo') as HTMLInputElement).value;

        if (!nombreInstitucion || !opcion || !motivo) {
          Swal.showValidationMessage('Por favor, complete todos los campos');
        }

        return { nombreInstitucion, opcion, motivo };
      },
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      const request = result.value;
      this.saveExterno(request);
    });
  }

  saveExterno(request: any) {
    this.http.post('http://localhost:8080/externo/saveExterno', request).subscribe(
      (response) => {
        Swal.fire('Registrado exitosamente', '', 'success');
      },
      (error) => {
        Swal.fire('Error al registrar', '', 'error');
      }
    );
  }

  openSweetAlertForm() {
    Swal.fire({
      title: 'Registrar Entrada',
      html:
        '<input id="nombres" class="swal2-input" placeholder="Nombres">' +
        '<input id="apellidos" class="swal2-input" placeholder="Apellidos">' +
        '<select id="area" class="swal2-input" style="margin-top: 10px;">' +
        '<option value="" disabled selected>Selecciona un área</option>' +
        this.areas.map(area => `<option value="${area}">${area}</option>`).join('') +
        '</select>' +
        '<select id="opcion" class="swal2-input" style="margin-top: 10px;">' +
        '<option value="" disabled selected>Selecciona una opción</option>' +
        this.opciones.map(opcion => `<option value="${opcion}">${opcion}</option>`).join('') +
        '</select>' +
        '<input id="motivo" class="swal2-input" placeholder="Motivo">',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      preConfirm: () => {
        const nombres = (document.getElementById('nombres') as HTMLInputElement).value;
        const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
        const area = (document.getElementById('area') as HTMLSelectElement).value;
        const opcion = (document.getElementById('opcion') as HTMLInputElement).value;
        const motivo = (document.getElementById('motivo') as HTMLInputElement).value;

        if (!nombres || !apellidos || !area || !opcion || !motivo) {
          Swal.showValidationMessage('Por favor, completa todos los campos');
          return false;
        }

        return { nombres, apellidos, area, opcion, motivo };
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.registrarEntrada(result.value);
      }
    });
  }

  registrarEntrada(data: any) {
    const url = 'http://localhost:8080/Empleado/registrarEntrada';
    this.http.post(url, data).subscribe(
      response => {
        Swal.fire('Éxito', 'Entrada registrada exitosamente', 'success');
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al registrar la entrada', 'error');
      }
    );
  }
}