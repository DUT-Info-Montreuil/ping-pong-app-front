import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../tournoi.service';
import { NewTournoi } from '../model/Tournoi';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { EquipementService } from '../../equipement/equipement.service';
import { Equipement } from '../../equipement/model/equipement';
import { JoueurService } from '../../joueur/joueur.service';
import { Joueur } from '../../joueur/model/Joueur';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../../match/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-creer-tournoi',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './form-creer-tournoi.component.html',
  styleUrl: './form-creer-tournoi.component.css'
})
export class FormCreerTournoiComponent implements OnInit{

  etape: number = 1;

  equipements: Equipement[] = [];
  joueurs: Joueur[] = [];
  joueurs_tournoi: Joueur[] = [];

  page = 1;
	pageSize = 4;
  collectionSize = 0;
  joueursTab: Joueur[] = []
  
  durees: number[] = [5, 10, 15, 20, 25, 30];

  newTournoi: NewTournoi = {
    format: 'Simple',
    niveau: '',
    date: new Date().toLocaleString().split(',')[0],
    duree: 0,
    lieu: '',
    matchs: [],
    equipement: undefined,
    status: false
  };

  constructor(private tournoiService: TournoiService, private equipementService: EquipementService, private joueurService: JoueurService, private matchService: MatchService, private router: Router) {
    this.refreshPaginations();
  }

  ngOnInit(): void {
    this.getAllEquipements();
  }

  updateProgress(etape: number): void {
    this.etape = etape;
  }

  avancerEtape(): void {
    this.etape++;
  }

  reculerEtape(): void {
    this.etape--;
  }

  getAllEquipements() {
    this.equipementService.getAllEquipement().subscribe(
      (next) => {
        this.equipements = next;
      }, (error) => {
        console.log(error);
      }
    )
  }

  getAllJoueurs() {
    this.joueurService.getAllJoueursFiltre(this.newTournoi.niveau).subscribe(
      (next) => {
        this.joueurs = next;
        this.collectionSize = this.joueurs.length;
        this.refreshPaginations();
      }, (error) => {
        console.log(error);
      }
    )
  }

  addTournoi() {
    this.matchService.creerMatchsAleatoire(this.joueurs_tournoi,this.newTournoi.equipement, this.newTournoi.duree).subscribe(
      (response: any) => {
        this.newTournoi.matchs = response.matchs;
        this.tournoiService.createTournoi(this.newTournoi).subscribe(
          (next: any) => {
            console.log(next);
            this.router.navigate(['/success'], { queryParams: { message: next.message } });
          },(error) => {
            console.log(error);
          }
        )
      }
    )
  }

  addEquipementTournoi(equipement: Equipement): void {
    this.newTournoi.equipement = equipement;
  }

  retirerEquipementTournoi(): void {
    this.newTournoi.equipement = undefined;
  }

  addJoueurToTournoi(joueur: Joueur): void {
    this.joueurs_tournoi.push(joueur);
    console.log(this.joueurs_tournoi);
    const index = this.joueursTab.findIndex((item) => item._id === joueur._id);
    console.log(this.joueursTab);
    if (index !== -1) {
      this.joueurs.splice(index, 1);
      this.collectionSize = this.joueurs.length;
      this.refreshPaginations();
    }
  }

  retirerJoueurDansTournoi(joueur: Joueur): void {
    const index = this.joueurs_tournoi.findIndex(item => item._id === joueur._id);
    if (index !== -1) {
      this.joueurs_tournoi.splice(index, 1);
      this.joueurs.push(joueur);
      this.collectionSize = this.joueurs.length;
      this.refreshPaginations();
    }
  }
  
  refreshPaginations() {
    this.joueursTab = this.joueurs.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  verifEtape1(): boolean { 
    return this.newTournoi.niveau === '' || this.newTournoi.duree === 0 || this.newTournoi.lieu === '';
  }

  verifEtape2(): boolean {
    return this.newTournoi.equipement === undefined;
  }

  joueursMaxAtteint(): boolean {
    return this.joueurs_tournoi.length == (this.newTournoi.duree / 5) * 2;
  }

  getJoueursMax(): number {
    return (this.newTournoi.duree / 5) * 2;
  }

  verifJoueursPair(): boolean {
    return this.joueurs_tournoi.length %2 != 0 || this.joueurs_tournoi.length == 0;
  }
  
}