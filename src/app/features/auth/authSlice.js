import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asyncThunkWrapper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";
// import { getDeviceId } from "../../../utils/deviceId.js";

// const deviceId = getDeviceId();

export const getMe = createAsyncThunk('auth/getMe', (_, thunkAPI) => asyncThunkWrapper(() => API.get('/auth/me'), thunkAPI));

export const verifyEmail = createAsyncThunk('auth/verifyEmail', (data, thunkAPI) => {
	return asyncThunkWrapper(() => API.post('/auth/verify-email', data), thunkAPI);
});

export const createUserAccount = createAsyncThunk('auth/createUserAccount', (userData, thunkAPI) => {
	return  asyncThunkWrapper(() => API.post('/auth/create-account', userData), thunkAPI)
});

export const loginUser = createAsyncThunk('auth/loginUser', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/login', userData), thunkAPI));

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await API.post('/auth/logout');
	} catch (error) {
		
		if (import.meta.env.DEV) console.warn("Logout API error :", error);
	}
	return;
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/forgot-password', userData), thunkAPI));

export const resetPassword = createAsyncThunk('auth/resetPassword', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/reset-password', userData), thunkAPI));

export const changePassword = createAsyncThunk('auth/changePassword', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/change-password', userData), thunkAPI));

const authSlice = createSlice({

	name: "auth",
	initialState: {

		user: null,
		isAuthenticated: false,
		loading: false,
		error: null
	},
	reducers: {
	},
	extraReducers: builder => {

		builder
		.addCase(getMe.pending, (state) => {

			state.error = null;
		})
		.addCase(getMe.fulfilled, (state, action) => {

			state.loading = false;
			const user = action.payload.data;
			state.user = user;
			state.error = null;
			state.isAuthenticated = true;
		})
		.addCase(getMe.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
			state.isAuthenticated = false;
			state.user = null;
		})
		.addCase(verifyEmail.pending, (state, action) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(verifyEmail.fulfilled, (state, action) => {

			state.loading = false;
			state.error = null;
		})
		.addCase(verifyEmail.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(createUserAccount.pending, (state) => {
			
			state.loading = true;
			state.error = null;
		})
		.addCase(createUserAccount.fulfilled, (state, action) => {
			
			state.loading = false;
			state.error = null;
		})
		.addCase(createUserAccount.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(loginUser.pending, (state) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(loginUser.fulfilled, (state, action) => {

			state.loading = false;
			state.isAuthenticated = true;
			const user = action.payload.data;
			state.user = user;
			state.error = null;
		})
		.addCase(loginUser.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
			state.isAuthenticated = false;
			state.user = null;
		})
		.addCase(logoutUser.pending, (state) => {

			state.error = null;
		})
		.addCase(logoutUser.fulfilled, (state, action) => {

			state.user = null;
			state.error = null;
			state.isAuthenticated = false;
		})
		.addCase(logoutUser.rejected, (state, action) => {

			state.user = null;
			state.error = null;
		})
		.addCase(forgotPassword.pending, (state, action) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(forgotPassword.fulfilled, (state, action) => {

			state.loading = false;
			state.error = null;
		})
		.addCase(forgotPassword.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(resetPassword.pending, (state, action) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(resetPassword.fulfilled, (state, action) => {

			state.loading = false;
			state.error = null;
		})
		.addCase(resetPassword.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(changePassword.pending, (state, action) => {
			state.error = null;
		})
		.addCase(changePassword.fulfilled, (state, action) => {
			state.error = null;
		})
		.addCase(changePassword.rejected, (state, action) => {
			state.error = action.payload.message;
		})
	}
});

export default authSlice.reducer;