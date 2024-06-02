import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUser } from "components/services/UserService";

const initialState = {
    userList: [],
    totalPages: 0,
};

export const getAllUsersThunk = createAsyncThunk(
    "getAllUsers",
    async (params) => {
        try {
            const { data } = await fetchAllUser(params);
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
            state.userList = action.payload.data;
            state.totalPages = action.payload.pages;
        });
    },
});

const userReducer = userSlice.reducer;

export const getUserState = (state) => state.user;

export default userReducer;
