import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joueur } from './model/Joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  constructor(private httpClient: HttpClient) { }

  getAllJoueurs(): Observable<Joueur[]> {
    return this.httpClient.get<Joueur[]>('/api/joueurs');
  }

  addJoueur(joueurJSON: JSON) {
    return this.httpClient.post<JSON>('/api/joueurs/add', joueurJSON);
  }

  getJoueurById(id: string): Observable<Joueur> {
    return this.httpClient.get<Joueur>(`/api/joueurs/${id}`);
  }
  
}