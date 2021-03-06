import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CarService {

  constructor(private http:HttpClient)  { }

  getCars(){
    return this.http.get('/server/api/v1/cars', {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') || '' })
    });
  }

  getCar(id: number){
    return this.http.get('/server/api/v1/cars/'+id, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') || '' })
    });
  }

  createCarRegistration(car){
    let body = JSON.stringify(car);
    return this.http.post('/server/api/v1/cars', body, httpOptions);
  }

  deleteCar(id:number){
    return this.http.delete('/server/api/v1/cars/'+id, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') || '' })
    });
  }
   
}
