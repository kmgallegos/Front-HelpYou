import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';




import { ActivatedRoute, Params, Route, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Service } from '../../../models/service';
import { ServiceService } from '../../../services/service.service';
import { user } from '../../../models/user';
import { UserrService } from '../../../services/userr.service';


@Component({
  selector: 'app-create-service',
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
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  servicess: Service = new Service();
  listarUser: user[]=[];

  edicion: boolean = false;
  id: number = 0;
  
  valoraciones:{value:String;viewValue:String}[]=
  [
    {value:'Excelente', viewValue:'Excelente'},
    {value:'Buena', viewValue:'Buena'},
    {value:'Regular', viewValue:'Regular'},
    {value:'Mala', viewValue:'Mala'}
  ];
  tservice:{value:String;viewValue:String}[]=
  [
    {value:'HOST', viewValue:'HOST'},
    {value:'DOMINIO', viewValue:'DOMINIO'}
  ];
  estados:{value:String;viewValue:String}[]=
  [
    {value:'Activo', viewValue:'Activo'},
    {value:'Inactivo', viewValue:'Inactivo'}
  ];

  constructor(
    private sS: ServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private shS:UserrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form= this.formBuilder.group({
      codigo:[''],
      valoracion:[''],
      direccion:['',Validators.required],
      estado:['',Validators.required],
      demant:[
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ],
      ],
      descripcion:['',Validators.required],
      tservice:['',Validators.required]

    });
    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.servicess.idService=this.form.value.codigo
      this.servicess.nameService = this.form.value.tservice;
      this.servicess.valuationService = this.form.value.valoracion;
      this.servicess.addressService = this.form.value.direccion;
      this.servicess.stateService = this.form.value.estado;
      this.servicess.demandService=this.form.value.demant;
      this.servicess.descriptionService=this.form.value.descripcion;
      this.sS.insert(this.servicess).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['services']);
    }
  }



init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idService),
          tservice: new FormControl(data.nameService),
          valoracion: new FormControl(data.valuationService),
          direccion: new FormControl(data.addressService),
          estado: new FormControl(data.stateService),
          demant: new FormControl(data.demandService),
          descripcion: new FormControl(data.descriptionService)
          
        });
      });
    }
  }

}
