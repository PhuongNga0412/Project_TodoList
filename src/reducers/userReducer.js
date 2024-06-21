import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUser } from "components/services/UserService";

const initialState = {
    status: "idle",
    userList: [],
    totalPages: 0,
};

export const getAllUsersThunk = createAsyncThunk(
    "getAllUsers",
    async (params) => {
        try {
            const { data } = await fetchAllUser(params);
            console.log("data: ", data);
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
        builder
            .addCase(getAllUsersThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.userList = action.payload.data;
                state.totalPages = action.payload.pages;
            })
            .addCase(getAllUsersThunk.rejected, (state) => {
                state.status = "rejected";
            });
    },
});

const userReducer = userSlice.reducer;

export const getUserState = (state) => state.user;

export default userReducer;
