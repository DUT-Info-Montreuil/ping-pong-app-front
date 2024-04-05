import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JoueurService } from '../joueur.service';
import { NgIf } from '@angular/common';
import { NewJoueur } from '../model/Joueur';

@Component({
  selector: 'app-add-joueur-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-joueur-form.component.html',
  styleUrl: './add-joueur-form.component.css'
})
export class AddJoueurFormComponent implements OnInit {

  response:any|undefined = undefined;

  newJoueur: NewJoueur = {
    nom: "",
    prenom: "",
    categorie: { age: 0, niveau: "" },
    point: 0,
    sexe: ""
  };


  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {}

  addJoueur(): void {

    this.joueurService.addJoueur(this.newJoueur).subscribe(
      (response) => {
        this.response = response;
        console.log('Joueur ajouté avec succès:', response);
        this.newJoueur = {
          nom: "",
          prenom: "",
          categorie: { age: 0, niveau: "" },
          point: 0,
          sexe: ""
        };
      
      }
    );
  }

  isFormValid(): boolean {
    return (
      this.newJoueur.nom.trim() !== "" 
      && this.newJoueur.prenom.trim() !== "" 
      && this.newJoueur.categorie.age !== null
      && this.newJoueur.categorie.age >= 0
      && this.newJoueur.categorie.age <= 100
      && this.newJoueur.categorie.niveau.trim() !== ""
      && this.newJoueur.sexe.trim() !== ""
    );
  }  

}