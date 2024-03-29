import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { persistLocalStorage } from "../../utilities";

function descendingComparator(a: User, b: User, orderBy: keyof User) {
    let x: any = null;
    let y: any = null;
    if (
        ["fullName", "email", "birthDate"].includes(orderBy) &&
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
    user: Partial<User> | null;
    users: User[] | null;
    userTemp: Partial<User> | null;
}

const initialState: UserState = {
    user: null,
    userTemp: null,
    users: null,
};

export const barberSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        setUserTemp: (state, action: PayloadAction<Partial<User> | null>) => {
            state.userTemp = action.payload;
        },
        setUser: (state, action: PayloadAction<Partial<User>>) => {
            persistLocalStorage("user", action.payload);
            state.user = action.payload;
        },
        setUsers: (state, action) => {
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
        setUserFromUserTemp: (state) => {
            persistLocalStorage("user", { ...state.userTemp });
            state.user = { ...state.userTemp };
            state.userTemp = null;
        },
    },
});

export const { setUsers, orderByProperty, setUser, setUserTemp, setUserFromUserTemp } =
    barberSlice.actions;

export default barberSlice.reducer;
