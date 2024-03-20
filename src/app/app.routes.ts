import { Routes } from '@angular/router';
import { JoueurListComponent } from './joueur/joueur-list/joueur-list.component';
import { AddJoueurFormComponent } from './joueur/add-joueur-form/add-joueur-form.component';

export const routes: Routes = [
    { path: 'liste_joueurs', component: JoueurListComponent },
    { path: 'form-joueur', component: AddJoueurFormComponent}
];