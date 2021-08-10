import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public cars;

  constructor(private carService:CarService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(
      data => {this.cars = data},
      err => console.error(err),
      () => console.log('cars loaded')
    );
  }

  logout(){
    this.authService.logout();
  }

  goToForm(){
    this.router.navigate(['']);
  }


}
