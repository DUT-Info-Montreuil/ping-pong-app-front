import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTournoi, Tournoi } from './model/Tournoi';
import { Observable } from 'rxjs';
import { Match } from '../match/model/Match';

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

  updateStatusTournoi(id: string|undefined, tournoi:NewTournoi) {
    return this.httpClient.put<Tournoi>(`/api/tournois/${id}`, tournoi);
  }

  updateMatchTournoiScore(tournoiId: string, matchId: string, scoreJ1: number, scoreJ2: number) {
    return this.httpClient.put<Tournoi>(`/api/tournois/${tournoiId}/match/${matchId}`, {scoreJ1: scoreJ1, scoreJ2: scoreJ2});
  }  
}
