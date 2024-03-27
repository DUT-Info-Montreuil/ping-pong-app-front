import { Component } from '@angular/core';
import { TournoiService } from '../tournoi.service';
import { NewTournoi } from '../model/Tournoi';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-creer-tournoi',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-creer-tournoi.component.html',
  styleUrl: './form-creer-tournoi.component.css'
})
export class FormCreerTournoiComponent {

  newTournoi: NewTournoi = {
    format: '',
    niveau: '',
    date: new Date(),
    duree: '',
    lieu: '',
    status: false
  };

  constructor(private tournoiService: TournoiService) {}

  addTournoi() {
    this.tournoiService.createTournoi(this.newTournoi).subscribe(
      (next) => {
        console.log(next);
        this.newTournoi = {
          format: '',
          niveau: '',
          date: new Date(),
          duree: '',
          lieu: '',
          status: false
        };
      }
    )
  }

}
