import { Component } from '@angular/core';
import { TournoiService } from '../tournoi.service';
import { NewTournoi } from '../model/Tournoi';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-creer-tournoi',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './form-creer-tournoi.component.html',
  styleUrl: './form-creer-tournoi.component.css'
})
export class FormCreerTournoiComponent {

  etape: number = 1;

  newTournoi: NewTournoi = {
    format: 'Simple',
    niveau: '',
    date: new Date(),
    duree: '',
    lieu: '',
    status: false
  };

  constructor(private tournoiService: TournoiService) {}

  updateProgress(step: number) {
    this.etape = step;
  }

  avancerEtape() {
    this.etape++;
  }

  reculerEtape() {
    this.etape--;
  }

  addTournoi() {
    this.tournoiService.createTournoi(this.newTournoi).subscribe(
      (next) => {
        console.log(next);
        this.newTournoi = {
          format: 'Solo',
          niveau: '',
          date: new Date(),
          duree: '',
          lieu: '',
          status: false
        };
        this.etape = 1;
      }
    )
  }

}
