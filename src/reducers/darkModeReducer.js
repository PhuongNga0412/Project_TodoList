import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: JSON.parse(localStorage.getItem("dark-mode")) || false,
};

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem("dark-mode", JSON.stringify(state.darkMode));
        },
    },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
