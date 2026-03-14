import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import asyncThunkWrapper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";

const listAdapter = createEntityAdapter({
	selectId: list => list._id,
	sortComparer: (a,b) => a.position - b.position
});

const fetchLists = createAsyncThunk('lists/fetchLists', (_, thunkAPI) => asyncThunkWrapper(() => API.get('/lists'), thunkAPI));

const createList = createAsyncThunk('lists/createList', (title, thunkAPI) => asyncThunkWrapper(() => API.post('/lists', { title }), thunkAPI));

const updateList = createAsyncThunk('lists/updateList', ({ id, title }, thunkAPI) => asyncThunkWrapper(() => API.patch(`/lists/${id}`, { title }), thunkAPI));

const deleteList = createAsyncThunk('lists/deleteList', (id, thunkAPI) => asyncThunkWrapper(() => API.delete(`/lists/${id}`), thunkAPI));

const persistReorderLists = createAsyncThunk('lists/persistReorderLists', (listsOrder, thunkAPI) => asyncThunkWrapper(() => API.patch('/lists/reorder', { listsOrder } ), thunkAPI));

const listSlice = createSlice({
	name: "lists",
	initialState: listAdapter.getInitialState({
		loading: true,
		error: null
	}),
	reducers: {

		reorderList: (state, action) => {

			const updates = action.payload;
			
			// updates.forEach(u => {

			// 	if (state.entities[u._id]) {
				
			// state.entities[u._id].position = u.position;
			// 		listAdapter.upsertOne(state, u);
			// 	}
			// });

			listAdapter.upsertMany(state, updates);
		},
	},
	extraReducers: builder => {
		
		builder
		.addCase(fetchLists.pending, (state) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(fetchLists.fulfilled, (state, action) => {

			state.loading = false;
			state.error = null;
			listAdapter.setAll(state, action.payload.data);
		})
		.addCase(fetchLists.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(createList.fulfilled, (state, action) => {

			listAdapter.addOne(state, action.payload.data);
		})
		.addCase(updateList.fulfilled, (state, action) => {

			listAdapter.upsertOne(state, action.payload.data);
		})
		.addCase(deleteList.fulfilled, (state, action) => {
			
			const id = action.payload.data._id;
			listAdapter.removeOne(state, id);
		})
		.addCase(persistReorderLists.fulfilled, (state, action) => {
			// listAdapter.upsertMany(state, action.payload.data);
		})
		.addCase(persistReorderLists.rejected, (state, action) => {
			
			state.error = action.payload.message;
		});
	}
});

export { fetchLists, createList, updateList, deleteList, persistReorderLists };
export const { reorderList } = listSlice.actions;
export const { selectAll: selectAllLists, selectById: selectListByID, selectIds: selectListIDs } = listAdapter.getSelectors(state => state.lists);

export default listSlice.reducer;