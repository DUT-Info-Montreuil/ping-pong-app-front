import { Component } from '@angular/core';
import { NewTournoi, Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-tournoi',
  standalone: true,
  imports: [NgbNavModule, NgFor, NgIf, FormsModule],
  templateUrl: './details-tournoi.component.html',
  styleUrl: './details-tournoi.component.css'
})
export class DetailsTournoiComponent {

  id: string = "";
  tournoi:Tournoi|undefined = undefined;
  durees: number[] = [5, 10, 15, 20, 25, 30];
  message: string = "";

  constructor(private tournoiService: TournoiService, activateRoute: ActivatedRoute, private router: Router) {
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

  updateStatusTournoi(tournoi: Tournoi | undefined) {
    if (tournoi) {
      const updatedTournoi: NewTournoi = {
          format: tournoi.format,
          niveau: tournoi.niveau,
          date: tournoi.date,
          duree: tournoi.duree,
          lieu: tournoi.lieu,
          matchs: tournoi.matchs,
          equipement: tournoi.equipement,
          status: true,
          gagnant: undefined
      }
      this.tournoiService.updateStatusTournoi(tournoi._id, updatedTournoi).subscribe(
        (update: any) => {
          this.router.navigate(['/success'], { queryParams: { message: update.message } });
        },
        (error) => {
          console.log('Erreur lors de la mise à jour du tournoi :', error);
        }
      );
    } else {
      console.log('ID ou tournoi est undefined.');
    }
  }

  accederAuTournoi(tournoi: Tournoi|undefined) {
    if(tournoi) {
      this.router.navigate(['/visualiser-tournoi', tournoi._id]);
    }
  }

  modifierTournoi(): void {
    if(this.tournoi) {
      const updateTournoi: NewTournoi = {
        format: this.tournoi.format,
        niveau: this.tournoi.niveau,
        date: this.tournoi.date,
        duree: this.tournoi.duree,
        lieu: this.tournoi.lieu,
        matchs: this.tournoi.matchs,
        equipement: this.tournoi.equipement,
        status: this.tournoi.status,
        gagnant: this.tournoi.gagnant
      }
      this.tournoiService.updateTournoi(this.tournoi._id, updateTournoi).subscribe(
        (next) => {
          this.message = next.message;
        },
        erreur => {
          console.error(erreur);
        }
      );
    }
  }
  
}
