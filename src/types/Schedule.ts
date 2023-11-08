export type Shift = {
    start: string;
    end: string;
};

export type Schedule = {
    day: "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado";
    morningShift: Shift;
    afternoonShift: Shift;
};
