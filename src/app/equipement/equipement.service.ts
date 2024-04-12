import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipement } from './model/equipement';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquipementService {


  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000';


  getEquipementService(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/equipement/');
  }


  updateEquipement(id: string, equipement: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/equipement/${id}`, equipement);
  }
}
