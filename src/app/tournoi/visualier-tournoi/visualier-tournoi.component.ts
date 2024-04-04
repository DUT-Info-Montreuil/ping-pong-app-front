import { Component } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Match } from '../../match/model/Match';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../../match/match.service';
import { Joueur } from '../../joueur/model/Joueur';

@Component({
  selector: 'app-visualier-tournoi',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, NgbNavModule],
  templateUrl: './visualier-tournoi.component.html',
  styleUrl: './visualier-tournoi.component.css'
})
export class VisualierTournoiComponent {

  id: string = "";
  message: string|undefined = undefined
  tournoi:Tournoi|undefined = undefined;
  rounds: Match[][] = [];
  matchsEnCours: boolean = false;

  constructor(private tournoiService: TournoiService, private matchService: MatchService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    tournoiService.getTournoiById(this.id).subscribe(
      (tournoi) => {
        this.tournoi = tournoi;
        this.genererRounds();
      },
      (error)=> {
        console.log(error);
      }
    )
  }

  isValidScore(score: number): boolean {
    if (score === null || score === undefined) {
      return false;
    }
    return !isNaN(score) && score >= 0 && score <= 11;
  }

  updateScore(match: Match): void {
    if(this.tournoi) {
      this.tournoiService.updateMatchTournoiScore(this.tournoi?._id, match._id, match.scoreJ1, match.scoreJ2).subscribe(
        (next: any) => {
          this.message = next.message;
        }
      )
    }
  }

  resetMessage(): void {
    this.message = "";
  }

  finirMatchDansTournoi(match: Match): void {
    if(this.tournoi)
    this.tournoiService.finirMatchTournoi(this.tournoi._id, match._id, match.scoreJ1, match.scoreJ2).subscribe(
      (response) => {
        console.log(response.message);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la fin du match:', error);
      }
    );
  }

  genererRounds(): void {
    if (this.tournoi && this.tournoi.matchs && this.tournoi.matchs.length > 0) {
        const nbMatchsTotal = this.tournoi.matchs.length;
        const nbMatchsParRound = Math.ceil(nbMatchsTotal / Math.ceil(nbMatchsTotal / 3));

        this.rounds = [];
        
        let matchsTraites = 0;

        while (matchsTraites < nbMatchsTotal) {
            const roundMatches = this.tournoi.matchs.slice(matchsTraites, matchsTraites + nbMatchsParRound);
            this.rounds.push(roundMatches);
            matchsTraites += nbMatchsParRound;
        }
        
        this.matchsEnCours = this.tournoi.matchs.some(match => match.resultat === 0);
    }
  }
  
  roundMax(): number {
    let round: number = 0;
    if(this.tournoi) {
      round = +this.tournoi.duree / 5
    }
    return round;
  }

  
  nouveauRound(): void {
    if (this.tournoi && this.tournoi._id) {
      const joueursPremierTour = this.getListJoueurRoundUn();
      const tournoi_id = this.tournoi._id;
      this.matchService.creerMatchsAleatoire(joueursPremierTour, this.tournoi.equipement, this.tournoi.duree).subscribe(
        (response: any) => {
          const match = response.matchs;
          this.tournoiService.ajouterMatchTournoi(tournoi_id, match).subscribe(
            (response) => {
              console.log(response);
              this.tournoiService.getTournoiById(tournoi_id).subscribe(
                (tournoi) => {
                  this.tournoi = tournoi;
                  this.genererRounds();
                }
              )
            }
          )
        }
      )
    } else {
      console.error('Tournoi non trouvé.');
    }
  }

  private getListJoueurRoundUn(): Joueur[] {
    const joueur_tournoi: Joueur[] = [];
    this.rounds[0].forEach((match) => {
      joueur_tournoi.push(match.joueur_1);
      joueur_tournoi.push(match.joueur_2);
    });
    return joueur_tournoi;
  }

  dernierRoundTermine(): boolean {
    if (this.tournoi && this.rounds.length > 0) {
      const dernierRound = this.rounds[this.rounds.length - 1];
      return dernierRound.every(match => match.resultat !== 0);
    }
    return false;
  }

}
