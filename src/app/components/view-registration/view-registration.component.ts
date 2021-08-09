import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {

  public carReg;
  public tempId=this.route.snapshot.params.id;

  constructor(private carService: CarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarReg(this.tempId);
  }

  getCarReg(id:number){
    this.carService.getCar(id).subscribe(
      data =>{
        this.carReg = data;
      },
      err => console.error(err),
      () => console.log('cars loaded')
    );
  }


  deleteCarFromRegistration(){
    this.carService.deleteCar(this.tempId).subscribe(
      err => console.error(err),
      () => console.log('car deleted')
    )

  }
}
