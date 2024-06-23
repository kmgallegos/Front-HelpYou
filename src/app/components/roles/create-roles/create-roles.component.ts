import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { role } from '../../../models/role';
import { user } from '../../../models/user';
import { RoleService } from '../../../services/role.service';
import { UserrService } from '../../../services/userr.service';


@Component({
  selector: 'app-create-roles',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './create-roles.component.html',
  styleUrl: './create-roles.component.css'
})
export class CreateRolesComponent {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  roles: role=new role();
  listarUser: user[]=[];
  tipoRole: { value: string; viewValue: string }[] = [
    { value: 'MODERADOR', viewValue: 'MODERADOR' },
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' },
    { value: 'CLIENTE', viewValue: 'CLIENTE' }
  
  ];
  constructor(
    private sS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private shS: UserrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form= this.formBuilder.group({
      Id:[''],
      tipoRole:['',Validators.required],
      descripcion:[''],
      username:['',Validators.required]
      
    });
    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
  }


  aceptar(): void {
    if (this.form.valid) {
      
      this.roles.id= this.form.value.Id;
      this.roles.rol = this.form.value.tipoRole;
      this.roles.descriptionR = this.form.value.descripcion;
      this.roles.user.id = this.form.value.username;
      this.sS.insert(this.roles).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['roles']);
    }
  }


  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          Id: new FormControl(data.id),
          tipoRole: new FormControl(data.rol),
          descripcion: new FormControl(data.descriptionR),
          username: new FormControl(data.user.id)
          
          
        });
      });
    }
  }



  }
