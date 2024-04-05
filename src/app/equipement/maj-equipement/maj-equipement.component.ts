import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {EquipementService} from "../equipement.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-maj-equipement',
  standalone: true,
  imports: [],
  templateUrl: './maj-equipement.component.html',
  styleUrl: './maj-equipement.component.css'
})
export class MajEquipementComponent {
  equipementForm: FormGroup;

  constructor(private fb: FormBuilder, private equipementService: EquipementService) {
    this.equipementForm = this.fb.group({
      table_tenis: this.fb.group({
        quantité: [''],
        état: [''],
        disponibilité: ['']
      }),
      filet: this.fb.group({
        quantité: [''],
        état: [''],
        disponibilité: ['']
      }),

      balle: this.fb.group({
        quantité: [''],
        état: [''],
        disponibilité: ['']
      }),
      marqueur: this.fb.group({
        quantité: [''],
        état: [''],
        disponibilité: ['']
      }),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.equipementService.updateEquipement('660bfd440221398266884a0c', this.equipementForm.value).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }
}
