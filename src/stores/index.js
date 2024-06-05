import darkModeReducer from "reducers/darkModeReducer";
import userReducer from "../reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer,
        darkMode: darkModeReducer,
    },
});

export default store;
