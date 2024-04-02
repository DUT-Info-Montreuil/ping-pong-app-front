import { Component } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute } from '@angular/router';
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

}
