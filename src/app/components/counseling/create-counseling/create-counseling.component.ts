import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CounselingService } from '../../../services/counseling.service';
import { Counseling } from '../../../models/counseling';
import { UserrService } from '../../../services/userr.service';
import { user } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-create-counseling',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatNativeDateModule, 
    RouterLink, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './create-counseling.component.html',
  styleUrls: ['./create-counseling.component.css']
})
export class CreateCounselingComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  counseling: Counseling = new Counseling();
  usersList: user[] = [];

  constructor(
    private counselingService: CounselingService,
    private userrService: UserrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idCounseling: [''],
      meetingDateCounseling: ['', Validators.required],
      meetingHourCounseling: ['', [Validators.required, this.validateHour]],
      meetingMinuteCounseling: ['', [Validators.required, this.validateMinute]],
      commentCounseling: ['', Validators.required],
      user: ['', Validators.required]
    });

    this.userrService.list().subscribe((data) => {
      this.usersList = data;
    });
  }

  validateHour(control: FormControl) {
    const value = control.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 23)) {
      return null;
    }
    return { invalidHour: true };
  }

  validateMinute(control: FormControl) {
    const value = control.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 59)) {
      return null;
    }
    return { invalidMinute: true };
  }

  aceptar(): void {
    if (this.form.valid) {
      this.counseling.idCounseling = this.form.get('idCounseling')?.value;
      this.counseling.meetingDateCounseling = new Date(this.form.get('meetingDateCounseling')?.value);
      const hour = this.form.get('meetingHourCounseling')?.value.padStart(2, '0');
      const minute = this.form.get('meetingMinuteCounseling')?.value.padStart(2, '0');
      this.counseling.meetingTimeCounseling = `${hour}:${minute}:00`;
      this.counseling.commentCounseling = this.form.get('commentCounseling')?.value;
      this.counseling.user = { id: this.form.get('user')?.value } as user;

      if (this.edicion) {
        this.counselingService.update(this.counseling).subscribe(() => {
          this.counselingService.list().subscribe((data) => {
            this.counselingService.setList(data);
          });
          this.router.navigate(['counselings']);
        });
      } else {
        this.counselingService.insert(this.counseling).subscribe(() => {
          this.counselingService.list().subscribe((data) => {
            this.counselingService.setList(data);
          });
          this.router.navigate(['counselings']);
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.counselingService.listId(this.id).subscribe((data) => {
        const [hour, minute] = data.meetingTimeCounseling.split(':');
        this.form = this.formBuilder.group({
          idCounseling: new FormControl(data.idCounseling),
          meetingDateCounseling: new FormControl(new Date(data.meetingDateCounseling)),
          meetingHourCounseling: new FormControl(hour),
          meetingMinuteCounseling: new FormControl(minute),
          commentCounseling: new FormControl(data.commentCounseling),
          user: new FormControl(data.user.id)
        });
      });
    }
  }
}
