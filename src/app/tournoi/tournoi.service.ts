import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTournoi, Tournoi } from './model/Tournoi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {

  constructor(private httpClient: HttpClient) { }

  createTournoi(tournoi: NewTournoi) {
    return this.httpClient.post<NewTournoi>("/api/tournois", tournoi);
  }

  getListTournois(): Observable<Tournoi[]> {
    return this.httpClient.get<Tournoi[]>("/api/tournois");
  }

  getTournoiById(id: string): Observable<Tournoi> {
    return this.httpClient.get<Tournoi>(`/api/tournois/${id}`);
  }
}
