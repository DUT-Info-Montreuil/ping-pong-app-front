export interface Equipement {
  _id: string;
  balle: {
      disponibilite: boolean;
      etat: string;
      quantite: number;
  };
  fillet: {
      disponibilite: boolean;
      etat: string;
      quantite: number;
  };
  marqueur: {
      disponibilite: boolean;
      etat: string;
      quantite: number;
  };
  table: {
      disponibilite: boolean;
      etat: string;
      quantite: number;
  };
}
