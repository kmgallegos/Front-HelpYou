import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Type_service } from '../../../models/type_service';
import { Service } from '../../../models/service';
import { TypeServiceService } from '../../../services/type-service.service';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-create-type',
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
  templateUrl: './create-type.component.html',
  styleUrl: './create-type.component.css'
})
export class CreateTypeComponent{
  form: FormGroup = new FormGroup({})
  edicion: boolean = false;
  id: number = 0;
  tiposDeServicios: Type_service = new Type_service();
  listarServicios: Service[] = [];

  constructor
  (
    private sS:TypeServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private shS: ServiceService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form= this.formBuilder.group({
      Id:[''],
      descripcion:[''],
      Service:['',Validators.required]
      
    });
    this.shS.list().subscribe((data) => {
      this.listarServicios = data;
    });
  }

  aceptar():void{
    if (this.form.valid) {
      
      this.tiposDeServicios.idTypeService= this.form.value.Id;
      this.tiposDeServicios.descriptionTService = this.form.value.descripcion;
      this.tiposDeServicios.service.idService = this.form.value.Service;
      this.sS.insert(this.tiposDeServicios).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['typeServices']);
    }
  }

  init()
  {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          Id: new FormControl(data.idTypeService),
          descripcion: new FormControl(data.descriptionTService),
          servicio: new FormControl(data.service.idService)      
        });
      });
    }
  }
}
