import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../tournoi.service';
import { Tournoi } from '../model/Tournoi';

@Component({
  selector: 'app-list-tournois',
  standalone: true,
  imports: [],
  templateUrl: './list-tournois.component.html',
  styleUrl: './list-tournois.component.css'
})
export class ListTournoisComponent implements OnInit {

  liste_tournoi: Tournoi[] = [];

  constructor(private tournoiService: TournoiService) {}

  ngOnInit(): void {
    
  }


}
