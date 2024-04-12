import { Component } from '@angular/core';
import { Joueur } from '../model/Joueur';
import { JoueurService } from '../joueur.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details-joueur',
  standalone: true,
  imports: [NgIf],
  templateUrl: './details-joueur.component.html',
  styleUrl: './details-joueur.component.css'
})
export class DetailsJoueurComponent {

  id: string = "";
  joueur:Joueur|undefined = undefined;

  constructor(private joueurService: JoueurService, activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  
    this.joueurService.getJoueurById(this.id).subscribe(
      (res:Joueur) => {
        this.joueur = res;
      },
      (error) => {
        console.log("Erreur : ",error)
      }
    )
  }

}