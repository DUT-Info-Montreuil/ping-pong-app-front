import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTournoi } from './model/Tournoi';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {

  constructor(private httpClient: HttpClient) { }

  createTournoi(tournoi: NewTournoi) {
    return this.httpClient.post<NewTournoi>("/api/tournois/add", tournoi);
  }
}
