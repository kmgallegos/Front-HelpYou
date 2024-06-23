import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Detail } from '../../../models/detail';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-create-detail',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './create-detail.component.html',
  styleUrl: './create-detail.component.css'
})
export class CreateDetailComponent implements OnInit{

  
  form: FormGroup = new FormGroup({});
  detail: Detail = new Detail();

  edicion: boolean = false;
  id: number = 0;
  
  constructor(
    private sS: DetailService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicion = data['id'] != null;

    });

    this.form = this.formBuilder.group({
    codigo: [''],
    SubTotal: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    Cantidad: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    invoice: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    subscription: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

  }

  aceptar(): void {
    if (this.form.valid) {
      console.log('Formulario válido:', this.form.value);
      this.detail.idDetail = this.form.value.codigo;
      this.detail.subTotalDetail = this.form.value.SubTotal;
      this.detail.quantityDetail = this.form.value.Cantidad;
      this.detail.invoice.idInvoice = this.form.value.invoice;
      this.detail.subscription.idSubscription = this.form.value.subscription;

      console.log('Valores asignados a detail:', {
        idDetail: this.detail.idDetail,
        subTotalDetail: this.detail.subTotalDetail,
        quantityDetail: this.detail.quantityDetail,
        invoice: this.detail.invoice.idInvoice,
        subscription: this.detail.subscription.idSubscription,
      });
      

      this.sS.insert(this.detail).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['details']);
    }
  }

}
