import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipement } from './model/equipement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {


  private apiUrl = '/api/equipement';

  constructor(private http: HttpClient) { }

  getEquipementService(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  modifierEquipement(idEquipement: string, donneesEquipement: any): Observable<any> {
    return this.http.put(`/api/equipement/${idEquipement}`, donneesEquipement);
  }

}
