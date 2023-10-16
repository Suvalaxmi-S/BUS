import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusesService {
  constructor() {}

  values: any[] = [];
  selected_seats: any[] = [];
  bus_No;
  Cost;
  select: any[] = [];
  names:any[]=[];
  ages:any[]=[];
  genders:any[]=[];
  sendata( selectedItems, bus_No, select) {
    this.selected_seats.push(selectedItems);
    this.bus_No = bus_No;
    this.select = select;
  }
  getdata() {
    return this.values;
  }
  getSeat() {
    return this.selected_seats;
  }
  getBus_No() {
    return this.bus_No;
  }
  getObj() {
    return this.select;
  }
  getFormValues(names,ages,genders)
  {
    this.names=names;
    this.ages=ages;
    this.genders=genders;
  }
  formValues_names()
  {
    return this.names;
  }
  formValues_ages()
  {
    return this.ages;
  }
  formValues_genders()
  {
    return this.genders;
  }
  send_cost(cost)
  {
    this.Cost=cost;
  }
  getCost()
  {
    return this.Cost;
  }
  send_form(name,age,gender)
  {
    this.names=name;
    this.ages=age;
    this.genders=gender;
  }
  get_name()
  {
    return this.names;
  }
  get_age()
  {
    return this.ages;
  }
  get_gender()
  {
    return this.genders;
  }
}
