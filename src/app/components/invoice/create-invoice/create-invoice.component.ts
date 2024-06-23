import { Component } from '@angular/core';
import moment from 'moment';
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
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../models/invoice';
import { user } from '../../../models/user';
import { UserrService } from '../../../services/userr.service';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {
  form: FormGroup = new FormGroup({});
  id: number = 0;
  invoice: Invoice = new Invoice();
  listarUser: user[]=[];
  fechaFactura: Date = moment().add( 'days').toDate();
  maxDate = new Date();

  constructor(
    private sS: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private shS:UserrService,
  ) {  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];

    });

    this.form = this.formBuilder.group({
      Id: [''], 
      fechaFactura: ['', Validators.required],
      Total: ['', [Validators.required, Validators.pattern('^[0-9]*(\.[0-9]{0,2})?$')]],
      username:['',Validators.required]
    });

    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });

  }

  aceptar(): void {

    if (this.form.valid) {
      // Asignación de valores
      console.log('Formulario:', this.form.value) // ver en consola
      this.invoice.idInvoice=this.form.value.Id,
      this.invoice.dateInvoice = this.form.value.fechaFactura,
      this.invoice.totalInvoice = this.form.value.Total,
      this.invoice.user.id = this.form.value.username
      
      // Lógica de inserción
      this.sS.insert(this.invoice).subscribe((data) => {
          this.sS.list().subscribe((data) => {
              this.sS.setList(data);
          });
      });

      this.router.navigate(['invoices']);
  }
  }

  
}
