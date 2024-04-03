import { Component } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Match, NewMatch } from '../../match/model/Match';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualier-tournoi',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './visualier-tournoi.component.html',
  styleUrl: './visualier-tournoi.component.css'
})
export class VisualierTournoiComponent {

  id: string = "";
  message: string|undefined = undefined
  tournoi:Tournoi|undefined = undefined;

  constructor(private tournoiService: TournoiService, activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    tournoiService.getTournoiById(this.id).subscribe(
      (tournoi) => {
        this.tournoi = tournoi;
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

  resetMessage() {
    this.message = "";
  }

}
