import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusesService } from '../services/buses.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  values: any[] = [];
  selectedBus: any[] = [];
  busNo;
  select: any[] = [];
  names: any[] = [];
  ages: any[] = [];
  genders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private busSer: BusesService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.values = this.busSer.getdata();
    this.names = this.busSer.get_name();
    this.ages = this.busSer.get_age();
    this.genders = this.busSer.get_gender();
    this.selectedBus = this.busSer.getSeat();
    this.busNo = this.busSer.getBus_No();
    this.select = this.busSer.getObj();

    let i = 0;
    //ON BOOKING SEATS THE VALUES ARE UPDATING IN DATABASE
    if (this.busNo == '456') {
      this.select.forEach((item, index) => {
        const id = item.id;
        const seatNo = item.Seat_No;
        const SeatType = item.Seat_type;

        const update_values = {
          Booked_status: true,
          BusNo: 456,
          Gender: this.genders[index],
          Name: this.names[index],
          Seat_No: seatNo,
          Seat_type: SeatType,
          id: id,
        };
        console.log('Updating:', update_values);
        this.http
          .put(
            `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus1/${id}.json`,
            update_values
          )
          .subscribe((res) => {
            console.log(res);
          });
      });
    }

    if (this.busNo == '789') {
      this.select.forEach((item, index) => {
        const id = item.id;
        const seatNo = item.Seat_No;
        const SeatType = item.Seat_type;
        const update_values = {
          Booked_status: true,
          BusNo: 789,
          Gender: this.genders[index],
          Name: this.names[index],
          Seat_No: seatNo,
          Seat_type: SeatType,
          id: id,
        };
        console.log('Updating:', update_values);
        this.http
          .put(
            `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus2/${id}.json`,
            update_values
          )
          .subscribe((res) => {
            console.log(res);
          });
      });
    }
    if (this.busNo == '985') {
      this.select.forEach((item, index) => {
        const id = item.id;
        const seatNo = item.Seat_No;
        const SeatType = item.Seat_type;
        const update_values = {
          Booked_status: true,
          BusNo: 985,
          Seat_No: seatNo,
          Gender: this.genders[index],
          Name: this.names[index],
          Seat_type: SeatType,
          id: id,
        };
        console.log('Updating:', update_values);
        this.http
          .put(
            `https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/seat_bus3/${id}.json`,
            update_values
          )
          .subscribe((res) => {
            console.log(res);
          });
      });
    }
  }
}
