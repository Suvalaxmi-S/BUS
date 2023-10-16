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
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
})
export class SeatComponent implements OnInit {
  myForm: FormGroup;
  bus_No;
  selected_bus;
  selected_bus_name;
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

  isSelected(seatNo: string, type: string, selected: object) {
    this.selectedState[seatNo] = !this.selectedState[seatNo];

    if (this.selectedState[seatNo]) {
      this.selectedItems.push(seatNo);
      this.select.push(selected);
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item !== seatNo);
      this.select=this.select.filter((item)=>item.Seat_No !==seatNo);
    }



    console.log('OBJECT_MAIN:', this.select);
    console.log(this.selectedItems, this.Cost);
  }

  canBook = false;
  displaySelectedItems() {
    if (this.select.length <= 5) {
      this.canBook = true;
      for(let i in this.select)
      {
      if (this.select[i].Seat_type === 'seater') this.Cost = this.Cost + 700;
      if (this.select[i].Seat_type === 'sleeper_lower') this.Cost = this.Cost + 1200;
      if (this.select[i].Seat_type === 'sleeper_upper') this.Cost = this.Cost + 1100;
      }
      this.busSer.send_cost(this.Cost);
      this.busSer.sendata(this.selectedItems,this.bus_No,this.select);
      this.router.navigate(['form']);
      
    } else {
      alert('a person can select a maximum of 5 seats only');
    }
    console.log('Selected Items:', this.selectedItems);
  }
  
  
  female_color = Array(28).fill(false);

  Array1 = [
    'S1',
    'S2',
    'S3',
    'S4',
    'S5',
    'S6',
    'SLU-1',
    'SLU-2',
    'SLU-3',
    'SLU-4',
  ];
  Array2 = [
    'S7',
    'S8',
    'S9',
    'S10',
    'S11',
    'S12',
    'SLU-5',
    'SLU-6',
    'SLU-7',
    'SLU-8',
  ];

  female() {}
  seat;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const busNo = params.get('Bus_No');
      this.bus_No = busNo;
      console.log(busNo);});
      
      const buses = [
        { busNo: '456', seatUrl: 'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus1.json' ,ind:0},
        { busNo: '789', seatUrl: 'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus2.json' ,ind:1},
        { busNo: '985', seatUrl: 'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus3.json' ,ind:2},
      ];
  
      // Iterate through buses
      for (const bus of buses) {
        if (this.bus_No === bus.busNo) {
          console.log("hello");
          this.fetchAndProcessBusData(bus);
        }
      }
    }
  
    // Define a function to fetch and process bus data
    private fetchAndProcessBusData(bus: { busNo: string; seatUrl: string;ind:number }): void {
      this.http.get(bus.seatUrl).pipe(
        map((data) => {
          const dataEntryed = [];
        
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              dataEntryed.push({ ...data[key], id: key });
            }
          }
  
          return dataEntryed;
        })
      ).subscribe((res) => {
        // Process the bus data
        this.selected_bus = res;
        console.log(this.selected_bus);
        
  
        for (let i in this.Array1) {
          for (let k in this.selected_bus) {
            if (this.selected_bus[k].Seat_No === this.Array1[i]) {
              if (
                this.selected_bus[k].Booked_status === true &&
                this.selected_bus[k].Gender === 'female'
              ) {
                for (let j in this.selected_bus) {
                  if (this.Array2[i] === this.selected_bus[j].Seat_No) {
                    if (this.selected_bus[j].Booked_status === false) {
                      this.female_color[j] = true;
                      this.global = j;
                      this.selected_bus[j]['only_female'] = true;
                      console.log(
                        'booo',
                        this.selected_bus[j],
                        this.female_color
                      );
                    }
                  }
                }
              }
            }
          }
        }

        for (let i in this.Array2) {
          for (let k in this.selected_bus) {
            if (this.selected_bus[k].Seat_No === this.Array2[i]) {
              if (
                this.selected_bus[k].Booked_status === true &&
                this.selected_bus[k].Gender === 'female'
              ) {
                for (let j in this.selected_bus) {
                  if (this.Array1[i] === this.selected_bus[j].Seat_No) {
                    if (this.selected_bus[j].Booked_status === false) {
                      this.female_color[j] = true;
                      this.global = j;
                      this.selected_bus[j]['only_female'] = true;
                      console.log(
                        'booo',
                        this.selected_bus[j],
                        this.female_color,
                        j
                      );
                    }
                  }
                }
              }
            }
          }
        }
      });
  
      this.http.get(`https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS[${bus.ind}].json`)
        .pipe(
          map((data) => {
            const dataEntryed = [];
  
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                dataEntryed.push({ ...data[key], id: key });
              }
            }
  
            return dataEntryed;
          })
        )
        .subscribe((res) => {
          this.selected_bus_name = res;
          console.log(this.selected_bus_name);
        });
    
      

    const checkboxNames = [
      'S1',
      'S2',
      'S3',
      'S4',
      'S5',
      'S6',
      'S7',
      'S8',
      'S9',
      'S10',
      'S11',
      'S12',
      'SLL-1',
      'SLL-2',
      'SLL-3',
      'SLL-4',
      'SLU-1',
      'SLU-2',
      'SLU-3',
      'SLU-4',
      'SLU-5',
      'SLU-6',
      'SLU-7',
      'SLU-8',
      'SLU-9',
      'SLU-10',
      'SLU-11',
      'SLU-12',
    ];

    this.seatnumbers.forEach((name) => {
      this.selectedState[name] = false;
    });
  }
  
  
  

  }
