import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../tournoi.service';
import { Tournoi } from '../model/Tournoi';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tournois',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-tournois.component.html',
  styleUrl: './list-tournois.component.css'
})
export class ListTournoisComponent implements OnInit {

  liste_tournoi: Tournoi[] = [];

  constructor(private tournoiService: TournoiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTournois();
  }

  getAllTournois() {
    this.tournoiService.getListTournois().subscribe(
      (tounois) => {
        this.liste_tournoi = tounois;
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  redirectToDetails(tournoi: Tournoi): void {
    this.router.navigate(['/tournoi', tournoi._id]);
  }

}