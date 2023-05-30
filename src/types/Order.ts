import { Barber } from "./Barber";
import { Service } from "./Service";

export type Order= {
  id:string;
  date:Date;
  time: string;
  service:Service | null;
  barber:Barber | null;
  
}