import { Component } from '@angular/core';
import { Tournoi } from '../model/Tournoi';
import { TournoiService } from '../tournoi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-tournoi',
  standalone: true,
  imports: [],
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
