import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Barber } from "../../types/Barber";
import { Order } from "../../types/Order";

function descendingComparator(a: Barber, b: Barber, orderBy: keyof Barber) {
    let x: any = null;
    let y: any = null;
    if (
        ["name", "email"].includes(orderBy) &&
        typeof a[orderBy] === "string" &&
        typeof b[orderBy] === "string"
    ) {
        x = (a[orderBy] as string).toUpperCase();
        y = (b[orderBy] as string).toUpperCase();
    } else {
        x = a[orderBy];
        y = b[orderBy];
    }
    if (y < x) {
        return -1;
    }
    if (y > x) {
        return 1;
    }
    return 0;
}
interface BarberState {
    barbers: Barber[] | null;
    barbersSelected: Barber[];
}

const initialState: BarberState = {
    barbers: null,
    barbersSelected: [],
};

export const barberSlice = createSlice({
    name: "barbers",
    initialState: initialState,
    reducers: {
        setBarbers: (state, action: PayloadAction<Barber[]>) => {
            state.barbers = action.payload;
        },
        setBarbersSelect: (state, action: PayloadAction<Barber[]>) => {
            state.barbersSelected = action.payload;
        },
        orderBarberByProperty: (
            state,
            action: PayloadAction<{ orderBy: keyof Barber; order: Order }>
        ) => {
            let data = state.barbers ? [...state.barbers] : null;
            if (action.payload.order === "desc") {
                data?.sort((a, b) => descendingComparator(a, b, action.payload.orderBy));
            } else {
                data?.sort((a, b) => -descendingComparator(a, b, action.payload.orderBy));
            }
            state.barbers = data;
        },
    },
});

export const { setBarbers, setBarbersSelect, orderBarberByProperty } = barberSlice.actions;

export default barberSlice.reducer;
