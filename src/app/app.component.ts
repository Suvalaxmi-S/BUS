import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AdminauthguardService } from './adminauthguard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user:boolean=false;
  admin:boolean=false;
  constructor(private authSer:AuthService,private adminauth:AdminauthguardService,private router:Router){


  }
  title = 'busTicket';
  ngOnInit(): void {
    
    
  }
  isLoggedIn(): boolean {
    
    return this.authSer.getTokenValue() && !this.authSer.getadmin();
    
  }
  logout()
  {  
     this.router.navigate(['login']);
  }
  logout1()
  {
    this.router.navigate(['admin']);
  }
  isadminLog()
  {
    return this.authSer.getadmin() && !this.authSer.getTokenValue();
  }
}
