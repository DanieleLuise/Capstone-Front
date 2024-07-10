import { IProdotto } from "./i-prodotto";

export interface ICarrello {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  righeCarrello: {
    id: number;
    prodotto: IProdotto;
    quantita: number;
    prezzo: number;
  }[];
}
