import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pipe, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css'],
})
export class AdminDetailsComponent implements OnInit {
  canAdd: boolean = false;
  busInfo1: any[] = [];
  busInfo2: any[] = [];
  busInfo3: any[] = [];
  seaterCount = 0;
  sleeperLowerCount = 0;
  sleeperUpperCount = 0;
  canView: boolean = true;
  formVal;
  @ViewChild('f') form: NgForm;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    //SEAT COUNT UPDATION IN DATABASE FOR EACH BUS
    this.http
      .get(
        'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus1.json'
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
        this.busInfo1 = res;
        console.log('bus1', this.busInfo1);

        for (let i of this.busInfo1) {
          if (i.Booked_status === true && i.Seat_type === 'seater') {
            this.seaterCount += 1;
            console.log(this.seaterCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_lower') {
            this.sleeperLowerCount += 1;
            console.log(this.sleeperLowerCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_upper') {
            this.sleeperUpperCount += 1;
            console.log(this.sleeperUpperCount);
          }
        }
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jbrhw34KmouAnRzC/BookedSeat_S.json',
            this.seaterCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jbrhw34KmouAnRzC/BookedSeat_SL_Lower.json',
            this.sleeperLowerCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jbrhw34KmouAnRzC/BookedSeat_SL_Upper.json',
            this.sleeperUpperCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.seaterCount = 0;
        this.sleeperLowerCount = 0;
        this.sleeperUpperCount = 0;
      });

    this.http
      .get(
        'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus2.json'
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
        this.busInfo2 = res;
        for (let i of this.busInfo2) {
          if (i.Booked_status === true && i.Seat_type === 'seater') {
            this.seaterCount += 1;
            console.log(this.seaterCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_lower') {
            this.sleeperLowerCount += 1;
            console.log(this.sleeperLowerCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_upper') {
            this.sleeperUpperCount += 1;
            console.log(this.sleeperUpperCount);
          }
        }
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jw6i4Npf3HZ-Z6gl/BookedSeat_S.json',
            this.seaterCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jw6i4Npf3HZ-Z6gl/BookedSeat_SL_Lower.json',
            this.sleeperLowerCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9jw6i4Npf3HZ-Z6gl/BookedSeat_SL_Upper.json',
            this.sleeperUpperCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.seaterCount = 0;
        this.sleeperLowerCount = 0;
        this.sleeperUpperCount = 0;
      });

    this.http
      .get(
        'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus3.json'
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
        this.busInfo3 = res;
        for (let i of this.busInfo3) {
          if (i.Booked_status === true && i.Seat_type === 'seater') {
            this.seaterCount += 1;
            console.log(this.seaterCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_lower') {
            this.sleeperLowerCount += 1;
            console.log(this.sleeperLowerCount);
          }
          if (i.Booked_status === true && i.Seat_type === 'sleeper_upper') {
            this.sleeperUpperCount += 1;
            console.log(this.sleeperUpperCount);
          }
        }
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9kIbsexDg_-tlKEAZ/BookedSeat_S.json',
            this.seaterCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9kIbsexDg_-tlKEAZ/BookedSeat_SL_Lower.json',
            this.sleeperLowerCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.http
          .put(
            'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS/-Nf9kIbsexDg_-tlKEAZ/BookedSeat_SL_Upper.json',
            this.sleeperUpperCount
          )
          .subscribe((res) => {
            console.log(res);
          });
        this.seaterCount = 0;
        this.sleeperLowerCount = 0;
        this.sleeperUpperCount = 0;
      });
  }
  add() {
    this.canAdd = false;
  }
  //DELETED TICKET UPDATION IN DATABASE
  delete_ticket(bus) {
    const upd = {
      Booked_status: false,
      BusNo: bus.BusNo,
      Gender: '',
      Name: '',
      Seat_No: bus.Seat_No,
      Seat_type: bus.Seat_type,
      id: bus.id,
      only_female: false,
    };
    if (bus.BusNo == 456) {
      this.http
        .put(
          `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus1/${bus.id}.json`,
          upd
        )
        .subscribe((res) => {
          alert('ticket cancelled');
          console.log(res);
        });
    }
    if (bus.BusNo == 789) {
      this.http
        .put(
          `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus2/${bus.id}.json`,
          upd
        )
        .subscribe((res) => {
          alert('ticket cancelled');
          console.log(res);
        });
    }
    if (bus.BusNo == 985) {
      this.http
        .put(
          `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus3/${bus.id}.json`,
          upd
        )
        .subscribe((res) => {
          alert('ticket cancelled');
          console.log(res);
        });
    }
  }

  nav() {
    this.router.navigate(['admin']);
  }
  // bus information validation for adding the bus
  onSubmit(form: NgForm) {
    if (this.form.valid) {
      this.formVal = this.form.value;
      console.log(this.formVal);
      this.http
        .post(
          'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS.json',
          this.formVal
        )
        .subscribe((res) => {
          console.log(res);
          alert('BUS ADDED SUCCESSFULLY!!');
          this.form.reset();
          this.canAdd = false;
        });
    } else {
      alert('Please enter all the details!');
    }
  }
}
