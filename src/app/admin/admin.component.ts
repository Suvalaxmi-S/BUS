import { Component, OnInit, ViewChild } from '@angular/core';
import { BusesService } from '../services/buses.service';
import { HttpClient } from '@angular/common/http';
import { pipe, map } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  busInfo1: any[] = [];
  busInfo2: any[] = [];
  busInfo3: any[] = [];
  formValues: any[] = [];
  selectedSeats: any[] = [];
  busNo;
  canView: boolean = false;
  result;
  constructor(
    private busSer: BusesService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authSer: AuthService
  ) {}
  ngOnInit(): void {
    //form validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
          Validators.required,
        ],
      ],
    });
    // retrieving the selectedSeats info from service
    this.selectedSeats = this.busSer.getSeat();
    this.busNo = this.busSer.getBusNo();
    this.formValues = this.busSer.getData();
    console.log(this.selectedSeats, this.busNo, this.formValues);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        this.authSer.sendAdmin('true');
        this.router.navigate(['admindetails']);
      } else {
        alert('Please enter valid email and password');
      }
    }
  }
}
