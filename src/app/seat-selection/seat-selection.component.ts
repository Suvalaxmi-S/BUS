import { Component, OnInit } from '@angular/core';
import { BUS } from './seatModel.model';
import { HttpClient } from '@angular/common/http';
import { Pipe } from '@angular/core';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  searchTerm: string;
  busInfo;
  searchBus;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get(
        'https://sample-eb12c-default-rtdb.asia-southeast1.firebasedatabase.app/BUS.json'
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
        this.busInfo = res;
        this.searchBus = res;
        console.log(this.busInfo);
      });
  }

  search() {
    if (this.searchTerm) {
      this.searchBus = this.busInfo.filter((bus) =>
        bus.To.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchBus = this.busInfo;
    }
  }
}
