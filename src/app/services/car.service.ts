import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient)  { }

  getCars(){
    return this.http.get('/server/api/v1/cars');
  }

}
