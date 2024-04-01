import { Match } from "../../match/model/Match"

export interface Tournoi {
    _id: string,
    format: string,
    niveau: string,
    date: string,
    duree: string,
    lieu: string,
    matchs: Match[],
    status: boolean
}

export interface NewTournoi {
    format: string,
    niveau: string,
    date: string,
    duree: number,
    lieu: string,
    matchs: Match[],
    status: boolean
}