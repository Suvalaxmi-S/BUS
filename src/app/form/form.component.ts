import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BusesService } from '../services/buses.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-seat',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  bus_No;
  selected_bus;
  selected_bus_name;
  index;
  selectedState: { [key: string]: boolean } = {};
  selectedArray: string[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private busSer: BusesService
  ) {}
  selectedItems: string[] = [];
  select: any[] = [];
  Cost: number = 0;
  select_id: any[] = [];
  global = null;
  seatnumbers:any[]=[];

  names:any[]=[];
  ages:any[]=[];
  gender:any[]=[];



  canBook = true;
  formValues: FormGroup[] = [];
  duplicate_array: any[] = [];
  // onSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     const seatDataArray = this.formValues.map((seatForm) => seatForm.value);
  //     this.duplicate_array.push(seatDataArray);
  //     alert('Values added successfully');
  //   }
  // }
  

 

  female() {}
  seat;
  ngOnInit(): void {
    
    this.select=this.busSer.getObj();
    this.Cost=this.busSer.getCost();
  //   this.myForm = this.fb.group({
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.pattern(/^[a-zA-Z\s]*$/),
  //       ],
  //     ],
  //     gender: ['', Validators.required],
  //     age: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.min(5),
  //         Validators.max(99),
  //         Validators.pattern('^[0-9]*$'),
  //       ],
  //     ],
  //   });
  //   this.formValues.push(this.myForm);
  // }
  // isFemaleBooked(seat: any): boolean {
  //   return seat.Gender === 'female' && seat.Booked_status;
  // }
  }
  showUpiForm: boolean = false;
  upiId: string = '';
  showSuccessMessage = false;
  display(): void {
    // Check if all ages are valid
    const areAgesValid = this.ages.every(age => this.isAgeValid(age));

    if (this.areAllFieldsFilled() && areAgesValid) {
      // Your logic here for form submission
      this.busSer.send_form(this.names, this.ages, this.gender);
      console.log('Name:', this.names);
      console.log('Ages:', this.ages);
      console.log('Gender:', this.gender);
      this.showUpiForm = true;
    } else {
      alert('Please enter all fields and ensure all ages are between 5 and 99.');
    }
  }

  isAgeValid(age: number): boolean {
    return age >= 5 && age <= 99;
  }
  areAllFieldsFilled(): boolean {
    const isFilled =
    this.names.length > 0 &&
    this.names.length === this.select.length &&
    this.ages.length === this.select.length &&
    this.gender.length === this.select.length &&
    // Check if all individual values are truthy (not empty or null)
    this.names.every(name => {
      const isValid = typeof name === 'string' && name !== '';
      if (!isValid) {
        console.log('Invalid name:', name);
      }
      return isValid;
    }) &&
    this.ages.every(age => {
      const isValid = age !== null && age !== undefined;
      if (!isValid) {
        console.log('Invalid age:', age);
      }
      return isValid;
    }) &&
    this.gender.every(g => {
      const isValid = typeof g === 'string' && g.trim() !== '';
      if (!isValid) {
        console.log('Invalid gender:', g);
      }
      return isValid;
    });

  console.log('Form filled:', isFilled);
  return isFilled;
  }
  submitUpiForm() {
    if (this.validateUpiId(this.upiId)) {
     
      alert('TRANSCATION SUCCESSFULL ✅');
      this.router.navigate(['book']);
    } else {
      alert('TRANSCATION FAILED-INVALID UPI ID ❌');
    }

    this.showUpiForm = false;
  }
  private validateUpiId(upiId: string): boolean {
    const savedUpiId = 'suva@oksbi';
    return upiId === savedUpiId;
  }
  }