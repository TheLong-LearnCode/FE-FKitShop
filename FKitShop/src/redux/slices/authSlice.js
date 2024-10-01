import { createSlice } from "@reduxjs/toolkit";
import * as status from "../constants/status";
import { login } from "../../service/authUser";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: status.IDLE,
        data: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = status.PENDING;
        })

        .addCase(login.fulfilled, (state, action) => {
            state.status = status.SUCCESSFULLY;
            state.data = action.payload;
        })

        .addCase(login.rejected, (state, action) => {
            state.status = status.FAILED;
            state.error = action.error.message;
        })
    },
});

export default authSlice.reducer;