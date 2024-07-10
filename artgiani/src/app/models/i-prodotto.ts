import { IUser } from "./i-user";

export interface IProdotto {
 id:number,
 nome:string,
 descrizione:string,
 prezzo:number,
 quantita: number;
 immagine:string,
 firstName:string,
 lastName:string,
 idUser?:number
 email: string;
 citta: string;
}

