import { Component } from '@angular/core';
import { NewTournoi, Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details-tournoi',
  standalone: true,
  imports: [NgbNavModule, NgFor, NgIf],
  templateUrl: './details-tournoi.component.html',
  styleUrl: './details-tournoi.component.css'
})
export class DetailsTournoiComponent {

  id: string = "";
  tournoi:Tournoi|undefined = undefined;

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
          status: true
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
  

}
