import dayjs from "dayjs";
const DateUtility = {
  /**
   * formattedDate, funcion definida para dar formato a un objeto de tipo Date
   * con el siguiente formato aaaa-mm-dd
   * 
   * @param date 
   * @returns (string) formato de fecha
   */
  formattedDate: (date:Date | string):string =>{
    date = new Date(date);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
  },
  /**
   * formattedDateTime, funcion definida para dar formato a un objeto de tipo Date
   * con el siguiente formato aaaa-mm-dd hh:mm
   * @param date 
   * @returns (string) formato fecha y hora
   */
  formattedDateTime: (date: Date | string): string => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hour = dayjs(date).hour() < 10 ? `0${dayjs(date).hour()}`: dayjs(date).hour()  ;
    let min = dayjs(date).minute()< 10 ? `0${dayjs(date).minute()}`:dayjs(date).minute();


    return `${year}-${month}-${day}  ${hour}:${min}`;
},
};

export default DateUtility;
