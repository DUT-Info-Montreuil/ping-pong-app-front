import { Joueur } from "../../joueur/model/Joueur";

export interface Match {
    _id: string,
    joueur_1: Joueur,
    joueur_2: Joueur,
    duree: number,
    resultat: number
}