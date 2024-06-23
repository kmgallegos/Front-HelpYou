import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { SuscriptionService } from '../../../services/suscription.service';
import { Suscription } from '../../../models/suscription';
import { UserrService } from '../../../services/userr.service';
import { ServiceService } from '../../../services/service.service';
import { user } from '../../../models/user';
import { Service } from '../../../models/service';
import Swal from 'sweetalert2';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-suscription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule 
  ],
  templateUrl: './create-suscription.component.html',
  styleUrls: ['./create-suscription.component.css']
})
export class CreateSuscriptionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  suscription: Suscription = new Suscription();
  listarUser: user[] = [];
  listarService: Service[] = [];
  fechaInicio: Date = moment().toDate();
  fechaFin: Date = moment().toDate();

  estado: { value: string; viewValue: string }[] = [
    { value: 'ACTIVO', viewValue: 'ACTIVO' },
    { value: 'INACTIVO', viewValue: 'INACTIVO' }
  ];

  constructor(
    private sS: SuscriptionService,
    private router: Router,
    private shS: UserrService,
    private ssS: ServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;

      this.initForm();
      
      if (this.edicion) {
        this.sS.listId(this.id).subscribe((data) => {
          this.suscription = data;
          this.form.patchValue({
            IdSus: this.suscription.idSubscription,
            fechaInicio: this.suscription.dataStartSubscription,
            fechaFin: this.suscription.subscriptionEndDate,
            estado: this.suscription.statusSubscription,
            tipo: this.suscription.typeSubscription,
            cost: this.suscription.priceSubscription,
            nameservice: this.suscription.service.idService,
            username: this.suscription.user.id
          });
        });
      }
    });

    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });

    this.ssS.list().subscribe((data) => {
      this.listarService = data;
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      IdSus: [{ value: '', disabled: this.edicion }],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      tipo: ['', Validators.required],
      cost: ['', Validators.required],
      nameservice: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.suscription.idSubscription = this.form.get('IdSus')?.value;
      this.suscription.dataStartSubscription = this.form.get('fechaInicio')?.value;
      this.suscription.subscriptionEndDate = this.form.get('fechaFin')?.value;
      this.suscription.typeSubscription = this.form.get('tipo')?.value;
      this.suscription.priceSubscription = this.form.get('cost')?.value;
      this.suscription.statusSubscription = this.form.get('estado')?.value;
      this.suscription.service = { idService: this.form.get('nameservice')?.value } as Service;
      this.suscription.user = { id: this.form.get('username')?.value } as user;

      if (this.edicion) {
        this.sS.update(this.suscription).subscribe(() => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data);
          });
          this.router.navigate(['suscriptions']);
        }, error => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El usuario ya tiene una suscripción.',
            });
          }
        });
      } else {
        this.sS.insert(this.suscription).subscribe(() => {
          this.sS.list().subscribe(data => {
            this.sS.setList(data);
          });
          this.router.navigate(['suscriptions']);
        }, error => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El usuario ya tiene una suscripción.',
            });
          }
        });
      }
    }
  }
}
