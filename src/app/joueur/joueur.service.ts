import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joueur, NewJoueur } from './model/Joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  constructor(private httpClient: HttpClient) { }

  getAllJoueurs(): Observable<Joueur[]> {
    return this.httpClient.get<Joueur[]>('/api/joueurs');
  }

  addJoueur(newJoueur: NewJoueur): Observable<NewJoueur> {
    return this.httpClient.post<NewJoueur>('/api/joueurs/add', newJoueur);
  }

  getJoueurById(id: string): Observable<Joueur> {
    return this.httpClient.get<Joueur>(`/api/joueurs/${id}`);
  }

  ajouteJoueurDeFichier(fichier: FormData): Observable<any> {
    return this.httpClient.put('/api/joueurs/add_fichier', fichier);
  }

}
