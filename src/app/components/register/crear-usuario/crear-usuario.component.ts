import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink, RouterOutlet } from '@angular/router';
import { user } from '../../../models/user';
import { UserrService } from '../../../services/userr.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    RouterOutlet
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  u: user = new user();
  id: number = 0;
  edicion:boolean=false;

  constructor(
    private sS: UserrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sR: RoleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      IdUser: [''],
      usernamee: ['', Validators.required],
      passwordd: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      region: ['', Validators.required],
      enable: [true],
      email: ['', Validators.required],
      dni: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.u.id = this.form.value.IdUser;
      this.u.username = this.form.value.usernamee;
      this.u.password = this.form.value.passwordd;
      this.u.firstNameUser = this.form.value.firstname;
      this.u.lastNameUser = this.form.value.lastname;
      this.u.regionUser = this.form.value.region;
      this.u.emailUser = this.form.value.email;
      this.u.dniUser = this.form.value.dni;
      this.u.enabled = this.form.value.enable;
      this.u.phoneNumberUser = this.form.value.numero;

      this.sS.insert(this.u).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            text: 'El usuario ha sido registrado exitosamente',
          }).then(() => {
            this.router.navigate(['login']);
          });
        },
        (error) => {
          let errorMessage = 'Ocurrió un error en el registro';
          if (error.status === 400) {
            errorMessage = error.error || 'El nombre de usuario ya existe o el ID es duplicado';
          }
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: 'El nombre de usuario ya existe o el ID es duplicado',
          });
          console.error(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos.',
      });
    }
  }

  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          IdUser: new FormControl(data.id),
          usernamee: new FormControl(data.username),
          passwordd: new FormControl(data.password),
          firstname: new FormControl(data.firstNameUser),
          lastname: new FormControl(data.lastNameUser),
          region: new FormControl(data.regionUser),
          email: new FormControl(data.emailUser),
          dni: new FormControl(data.dniUser),
          numero: new FormControl(data.phoneNumberUser),
          enable:new FormControl(data.enabled)
        });
      });
    }
  }
}
