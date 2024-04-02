import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipement } from './model/equipement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private httpClient: HttpClient) { }

  getAllEquipement(): Observable<Equipement[]> {
    return this.httpClient.get<Equipement[]>("/api/equipement");
  }
  
}
