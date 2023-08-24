import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

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
    },
});

export const { getAllUser } = barberSlice.actions;

export default barberSlice.reducer;
