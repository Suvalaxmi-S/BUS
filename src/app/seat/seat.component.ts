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
  busNo;
  selectedBus;
  selectedBusName;
  selectedState: { [key: string]: boolean } = {};
  selectedArray: string[] = [];
  selectedItems: string[] = [];
  select: any[] = [];
  Cost: number = 0;
  selectId: any[] = [];
  global = null;
  seatNumbers: any[] = [];
  femaleSeatColor = Array(28).fill(false);
  maleSeatColor = Array(28).fill(false);
  windowSeats = [
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
  adjacentSeats = [
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
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private busSer: BusesService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const busNo = params.get('Bus_No');
      this.busNo = busNo;
      console.log(busNo);
    });

    const buses = [
      {
        busNo: '456',
        seatUrl:
          'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus1.json',

        ind: 0,
      },
      {
        busNo: '789',
        seatUrl:
          'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus2.json',

        ind: 1,
      },
      {
        busNo: '985',
        seatUrl:
          'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus3.json',
        ind: 2,
      },
    ];

    // Iterate through buses
    for (const bus of buses) {
      if (this.busNo === bus.busNo) {
        console.log('hello');
        this.fetchAndProcessBusData(bus);
      }
    }
  }

  // Define a function to fetch and process bus data
  private fetchAndProcessBusData(bus: {
    busNo: string;
    seatUrl: string;
    ind: number;
  }): void {
    const updateData = {
      only_female: true,
    };
    this.http
      .get(bus.seatUrl)
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
        // Process the bus data
        this.selectedBus = res;
        console.log(this.selectedBus);
        //VALIDATING THE FEMALE SEATS
        for (let i in this.windowSeats) {
          for (let k in this.selectedBus) {
            if (this.selectedBus[k].Seat_No === this.windowSeats[i]) {
              if (
                this.selectedBus[k].Booked_status === true &&
                this.selectedBus[k].Gender === 'female'
              ) {
                for (let j in this.selectedBus) {
                  if (this.adjacentSeats[i] === this.selectedBus[j].Seat_No) {
                    if (this.selectedBus[j].Booked_status === false) {
                      this.femaleSeatColor[j] = true;
                      this.global = j;
                      this.selectedBus[j]['only_female'] = true;

                      console.log(
                        'booo',
                        this.selectedBus[j],
                        this.femaleSeatColor
                      );
                    }
                  }
                }
              }
            }
          }
        }

        for (let i in this.adjacentSeats) {
          for (let k in this.selectedBus) {
            if (this.selectedBus[k].Seat_No === this.adjacentSeats[i]) {
              if (
                this.selectedBus[k].Booked_status === true &&
                this.selectedBus[k].Gender === 'female'
              ) {
                for (let j in this.selectedBus) {
                  if (this.windowSeats[i] === this.selectedBus[j].Seat_No) {
                    if (this.selectedBus[j].Booked_status === false) {
                      this.femaleSeatColor[j] = true;
                      this.global = j;
                      this.selectedBus[j]['only_female'] = true;
                      console.log(
                        'booo',
                        this.selectedBus[j],
                        this.femaleSeatColor,
                        j
                      );
                    }
                  }
                }
              }
            }
          }
        }
        for (let i in this.windowSeats) {
          for (let k in this.selectedBus) {
            if (this.selectedBus[k].Seat_No === this.windowSeats[i]) {
              if (
                this.selectedBus[k].Booked_status === true &&
                this.selectedBus[k].Gender === 'male'
              ) {
                for (let j in this.selectedBus) {
                  if (this.adjacentSeats[i] === this.selectedBus[j].Seat_No) {
                    if (this.selectedBus[j].Booked_status === false) {
                      this.maleSeatColor[j] = true;
                      this.global = j;

                      console.log(
                        'booo',
                        this.selectedBus[j],
                        this.maleSeatColor
                      );
                    }
                  }
                }
              }
            }
          }
        }

        for (let i in this.adjacentSeats) {
          for (let k in this.selectedBus) {
            if (this.selectedBus[k].Seat_No === this.adjacentSeats[i]) {
              if (
                this.selectedBus[k].Booked_status === true &&
                this.selectedBus[k].Gender === 'male'
              ) {
                for (let j in this.selectedBus) {
                  if (this.windowSeats[i] === this.selectedBus[j].Seat_No) {
                    if (this.selectedBus[j].Booked_status === false) {
                      this.maleSeatColor[j] = true;
                      this.global = j;

                      console.log(
                        'booo',
                        this.selectedBus[j],
                        this.maleSeatColor,
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

    this.http
      .get(
        `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS[${bus.ind}].json`
      )
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
        this.selectedBusName = res;
        console.log(this.selectedBusName);
      });

    // checkboxnames
    this.seatNumbers.forEach((name) => {
      this.selectedState[name] = false;
    });
  }

  isSelected(seatNo: string, type: string, selected: object) {
    this.selectedState[seatNo] = !this.selectedState[seatNo];
    const index = this.seatNumbers.indexOf(seatNo);
    if (this.selectedState[seatNo]) {
      this.selectedItems.push(seatNo);
      this.select.push(selected);
      if (this.femaleSeatColor[index]) {
        // Reset border color to the original color for selected female seats
        this.femaleSeatColor[index] = false;
      }
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item !== seatNo);
      this.select = this.select.filter((item) => item.Seat_No !== seatNo);
      if (type === 'seater' && this.femaleSeatColor[index]) {
        // Set border color to pink for unselected female seats
        this.femaleSeatColor[index] = true;
      }
    }

    console.log('OBJECT_MAIN:', this.select);
    console.log(this.selectedItems, this.Cost);
  }

  canBook = false;
  displaySelectedItems() {
    if (this.select.length <= 5) {
      this.canBook = true;
      for (let i in this.select) {
        if (this.select[i].Seat_type === 'seater') this.Cost = this.Cost + 700;
        if (this.select[i].Seat_type === 'sleeper_lower')
          this.Cost = this.Cost + 1200;
        if (this.select[i].Seat_type === 'sleeper_upper')
          this.Cost = this.Cost + 1100;
      }
      this.busSer.sendCost(this.Cost);
      this.busSer.sendData(this.selectedItems, this.busNo, this.select);
      this.router.navigate(['form']);
    } else {
      alert('a person can select a maximum of 5 seats only');
    }
    console.log('Selected Items:', this.selectedItems);
  }
}

// const checkboxNames = [
//   'S1',
//   'S2',
//   'S3',
//   'S4',
//   'S5',
//   'S6',
//   'S7',
//   'S8',
//   'S9',
//   'S10',
//   'S11',
//   'S12',
//   'SLL-1',
//   'SLL-2',
//   'SLL-3',
//   'SLL-4',
//   'SLU-1',
//   'SLU-2',
//   'SLU-3',
//   'SLU-4',
//   'SLU-5',
//   'SLU-6',
//   'SLU-7',
//   'SLU-8',
//   'SLU-9',
//   'SLU-10',
//   'SLU-11',
//   'SLU-12',
// ];
