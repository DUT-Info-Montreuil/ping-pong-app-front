import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joueur } from '../joueur/model/Joueur';
import { Observable } from 'rxjs';
import { Match } from './model/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private httpClient: HttpClient) { }

  creerMatchsAleatoire(joueurs: Joueur[]): Observable<Match[]> {
    return this.httpClient.post<Match[]>("/api/matchs/random_match", joueurs);
  }
}
