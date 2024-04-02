import { Joueur } from "../../joueur/model/Joueur";

export interface Match {
    _id: string,
    joueurs_tournoi: Joueur[],
    duree: number,
    resultat: number
}