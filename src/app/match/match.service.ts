import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joueur } from '../joueur/model/Joueur';
import { Observable } from 'rxjs';
import { Match } from './model/Match';
import { Equipement } from '../equipement/model/equipement';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private httpClient: HttpClient) { }

  creerMatchsAleatoire(joueurs: Joueur[], equipement: Equipement|undefined, dureeTournoi: number): Observable<Match[]> {
    const data = {
      joueurs: joueurs,
      equipement: equipement,
      dureeTournoi: dureeTournoi
    };
    return this.httpClient.post<Match[]>("/api/matchs/random_match", data);
  }
}
