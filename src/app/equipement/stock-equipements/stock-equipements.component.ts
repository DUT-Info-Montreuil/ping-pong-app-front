import {Component, NgModule} from '@angular/core';
import {Equipement} from "../model/equipement";
import {EquipementService} from "../equipement.service";
import {NgFor, NgIf} from "@angular/common";
import {FormsModule, NgModel} from "@angular/forms";

@Component({
  selector: 'app-stock-equipements',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './stock-equipements.component.html',
  styleUrl: './stock-equipements.component.css'
})
export class StockEquipementsComponent {
  equipements: Equipement[] = [];

  constructor(private equipementService: EquipementService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.equipementService.getEquipementService().subscribe(equipements => this.equipements = equipements);
  }


}
