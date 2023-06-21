export type Appointment ={
  id: number;
  startDate: Date | string;
  endDate: Date | string;
  title: string;
  notes?:string;
}
