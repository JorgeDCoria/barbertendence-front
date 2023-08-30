import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { Order } from "../../types/Order";

function descendingComparator(a: User, b: User, orderBy: keyof User) {
    let x: any = null;
    let y: any = null;
    if (
        ["fullName", "mail"].includes(orderBy) &&
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

interface UserState {
    users: User[] | null;
}

const initialState: UserState = {
    users: null,
};

export const barberSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        getAllUser: (state, action) => {
            state.users = action.payload;
        },
        orderByProperty: (state, action) => {
            let data = state.users ? [...state.users] : null;
            if (action.payload.order === "desc") {
                data?.sort((a, b) => descendingComparator(a, b, action.payload.orderBy));
            } else {
                data?.sort((a, b) => -descendingComparator(a, b, action.payload.orderBy));
            }
            state.users = data;
        },
    },
});

export const { getAllUser, orderByProperty } = barberSlice.actions;

export default barberSlice.reducer;
