import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type StateError } from "../../types/StateError";

interface ErrorState {
    error: StateError | null;
}
const initialState: ErrorState = {
    error: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState: initialState,
    reducers: {
        setError: (state, action: PayloadAction<StateError>) => {
            state.error = action.payload;
        },
        clearError: (state, action) => (state.error = action.payload),
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
