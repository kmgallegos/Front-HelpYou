import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { card } from '../../../models/card';
import { user } from '../../../models/user';
import { CardService } from '../../../services/card.service';
import { UserrService } from '../../../services/userr.service';


@Component({
  selector: 'app-create-cards',
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
  templateUrl: './create-cards.component.html',
  styleUrl: './create-cards.component.css'
})
export class CreateCardsComponent {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;

  cards:card= new card();
  listarUser: user[]=[];
  name: { value: string; viewValue: string }[] = [
    { value: 'VISA', viewValue: 'VISA' },
    { value: 'MASTERCARD', viewValue: 'MASTERCARD' },
    { value: 'DINNERSCLUB', viewValue: 'DINNERSCLUB' }
  
  ];

  tipoyear: { value: string; viewValue: string }[] = [
    { value: "2020", viewValue: "2020" },
    { value: "2021", viewValue: "2021" },
    { value: "2022", viewValue: "2022" },
    { value: "2023", viewValue: "2023" },
    { value: "2024", viewValue: "2024" },
    { value: "2025", viewValue: "2025" },
    { value: "2026", viewValue: "2026" },
    { value: "2027", viewValue: "2027" },
    { value: "2028", viewValue: "2028" },
    { value: "2029", viewValue: "2029" },
    { value: "2030", viewValue: "2030" },
    { value: "2031", viewValue: "2031" },
    { value: "2032", viewValue: "2032" },
    { value: "2033", viewValue: "2033" },
    { value: "2034", viewValue: "2034" },
    { value: "2035", viewValue: "2035" },
    { value: "2036", viewValue: "2036" },
    { value: "2037", viewValue: "2037" },
    { value: "2038", viewValue: "2038" },
    { value: "2039", viewValue: "2039" },
    { value: "2040", viewValue: "2040" },
    { value: "2041", viewValue: "2041" },
    { value: "2042", viewValue: "2042" },
    { value: "2043", viewValue: "2043" },
    { value: "2044", viewValue: "2044" },
    { value: "2045", viewValue: "2045" },
    { value: "2046", viewValue: "2046" },
    { value: "2047", viewValue: "2047" },
    { value: "2048", viewValue: "2048" },
    { value: "2049", viewValue: "2049" },
    { value: "2050", viewValue: "2050" },
    { value: "2051", viewValue: "2051" },
    { value: "2052", viewValue: "2052" },
    { value: "2053", viewValue: "2053" },
    { value: "2054", viewValue: "2054" }
  ];

  tipomonth: { value: string; viewValue: string }[] = [
    { value: "01", viewValue: "Enero" },
    { value: "02", viewValue: "Febrero" },
    { value: "03", viewValue: "Marzo" },
    { value: "04", viewValue: "Abril" },
    { value: "05", viewValue: "Mayo" },
    { value: "06", viewValue: "Junio" },
    { value: "07", viewValue: "Julio" },
    { value: "08", viewValue: "Agosto" },
    { value: "09", viewValue: "Septiembre" },
    { value: "10", viewValue: "Octubre" },
    { value: "11", viewValue: "Noviembre" },
    { value: "12", viewValue: "Diciembre" }
  
  ];

  constructor(
    private sS:CardService,
    private router:Router,
    private shS:UserrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form= this.formBuilder.group({
      IdCard:[''],
      owner:['',Validators.required],
      numberC: ['',Validators.required],
      tipomonth:['',Validators.required],
      tipoyear:['',Validators.required],
      cvv:['',Validators.required],
      name:['', Validators.required],
      username:['',Validators.required]
      
    });
    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      
      this.cards.idCard= this.form.value.IdCard;
      this.cards.ownerCard = this.form.value.owner;
      this.cards.number_card = this.form.value.numberC;
      this.cards.month_expirationCard = this.form.value.tipomonth;
      this.cards.year_expirationCard = this.form.value.tipoyear;
      this.cards.cvvCard = this.form.value.cvv;
      this.cards.nameCard = this.form.value.name;
      this.cards.user.id = this.form.value.username;
      this.sS.insert(this.cards).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['cards']);
    }
  }

  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          IdCard: new FormControl(data.idCard),
          owner: new FormControl(data.ownerCard),
          numberC: new FormControl(data.number_card),
          tipoyear: new FormControl(data.year_expirationCard),
          tipomonth: new FormControl(data.month_expirationCard),
          cvv: new FormControl(data.cvvCard),
          name: new FormControl(data.nameCard),
          username: new FormControl(data.user.id)
          
        });
      });
    }
  }

}
