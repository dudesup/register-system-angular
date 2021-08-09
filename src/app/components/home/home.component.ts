import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: string[] = [
    'BMW X5',
    'BMW X7',
    'Audi A6',
    'Mazda 3',
    'Mercedes w201' 
  ];
  carform: FormGroup;
  validMessage: string = "";

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl()
    });
  }

  submitRegistration(){
    if(this.carform.valid){
      this.validMessage="Your car registration has been submitted. Thank you!";
      this.carService.createCarRegistration(this.carform.value).subscribe(
        data => {
          this.carform.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!"
    }
  }


}
