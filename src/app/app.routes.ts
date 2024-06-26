import { Routes } from '@angular/router';
import { JoueurListComponent } from './joueur/joueur-list/joueur-list.component';
import { AddJoueurFormComponent } from './joueur/add-joueur-form/add-joueur-form.component';
import { DetailsJoueurComponent } from './joueur/details-joueur/details-joueur.component';
import { FormCreerTournoiComponent } from './tournoi/form-creer-tournoi/form-creer-tournoi.component';
import { ResponseComponent } from './response/response/response.component';
import { ListTournoisComponent } from './tournoi/list-tournois/list-tournois.component';
import { DetailsTournoiComponent } from './tournoi/details-tournoi/details-tournoi.component';
import { VisualierTournoiComponent } from './tournoi/visualier-tournoi/visualier-tournoi.component';
import {StockEquipementsComponent} from "./equipement/stock-equipements/stock-equipements.component";
import { PageAccueilComponent } from './page-accueil/page-accueil.component';


export const routes: Routes = [
    { path: 'liste_joueurs', component: JoueurListComponent },
    { path: 'form-joueur', component: AddJoueurFormComponent},
    { path: 'joueur/:id', component: DetailsJoueurComponent},
    { path: 'form-tournoi', component: FormCreerTournoiComponent},
    { path: 'success', component: ResponseComponent},
    { path: 'liste-tournoi', component: ListTournoisComponent},
    { path: 'tournoi/:id', component: DetailsTournoiComponent},
    { path: 'visualiser-tournoi/:id', component:VisualierTournoiComponent},
    { path: 'stock-equipement', component: StockEquipementsComponent},
    { path: '**', component: PageAccueilComponent}
];
