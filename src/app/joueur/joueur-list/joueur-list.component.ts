import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JoueurService } from '../joueur.service';
import { Joueur } from '../model/Joueur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joueur-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './joueur-list.component.html',
  styleUrls: ['./joueur-list.component.css']
})
export class JoueurListComponent implements OnInit {

  fichierSelectionne: File | null = null;
  messageSucces: string = '';
  afficherAlerte: boolean = false;

  joueurs: Joueur[] = [];
  constructor(private joueurService: JoueurService, private router: Router) {}



  ngOnInit(): void {
   this.getAllJoueurs();
   console.log(this.joueurs)
  }

  getAllJoueurs(): void {
    this.joueurService.getAllJoueurs().subscribe(
      (res) => {
        this.joueurs = res;
        console.log(res)
      },
      (err) => {
        console.log("Erreur :", err);
      }
    );
  }


  onClickOpenDetails(joueur: Joueur): void {
    this.router.navigate(['/joueur',joueur._id]);
  }

  importerJoueurs(event: any): void {
    this.fichierSelectionne = event.target.files[0];
  }

  executerImportation(): void {
    if (!this.fichierSelectionne) return;
    const formData: FormData = new FormData();
    formData.append('fichier', this.fichierSelectionne, this.fichierSelectionne.name);
    this.joueurService.ajouteJoueurDeFichier(formData).subscribe(reponse => {
      this.afficherMessage('Les joueurs ont été importés avec succès.');
      this.getAllJoueurs();
    });
    this.fichierSelectionne = null; // Réinitialisez la sélection du fichier après l'importation
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 3000); // Cache l'alerte après 3 secondes
  }

}
