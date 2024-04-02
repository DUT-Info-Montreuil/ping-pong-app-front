import { Routes } from '@angular/router';
import { JoueurListComponent } from './joueur/joueur-list/joueur-list.component';
import { AddJoueurFormComponent } from './joueur/add-joueur-form/add-joueur-form.component';
import { DetailsJoueurComponent } from './joueur/details-joueur/details-joueur.component';
import { FormCreerTournoiComponent } from './tournoi/form-creer-tournoi/form-creer-tournoi.component';
import { ResponseComponent } from './response/response/response.component';


export const routes: Routes = [
    { path: 'liste_joueurs', component: JoueurListComponent },
    { path: 'form-joueur', component: AddJoueurFormComponent},
    { path: 'joueur/:id', component: DetailsJoueurComponent},
    { path: 'form-tournoi', component: FormCreerTournoiComponent},
    { path: 'success', component: ResponseComponent}
];