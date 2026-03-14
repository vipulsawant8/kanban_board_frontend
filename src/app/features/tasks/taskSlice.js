import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import asyncThunkWrapper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";

const taskAdapter = createEntityAdapter({
	selectId: task => task._id,
	sortComparer: (a,b) => a.position - b.position
});

const fetchTasks = createAsyncThunk('tasks/fetchTasks', (_, thunkAPI) => asyncThunkWrapper(() => API.get('/tasks'), thunkAPI));

const createTask = createAsyncThunk('tasks/createTask', ({ listID, title, description}, thunkAPI) => asyncThunkWrapper(() => API.post('/tasks', { listID, title, description }), thunkAPI));

const updateTask = createAsyncThunk('tasks/updateTask', ({ id, title, description }, thunkAPI) => asyncThunkWrapper(() => API.patch(`/tasks/${id}`, { title, description }), thunkAPI));

const deleteTask = createAsyncThunk('tasks/deleteTask', (id, thunkAPI) => asyncThunkWrapper(() => API.delete(`/tasks/${id}`), thunkAPI));

const persistReorderTasks = createAsyncThunk('tasks/persistReorderTasks', (tasksOrder, thunkAPI) => asyncThunkWrapper(() => API.patch('/tasks/reorder', { tasksOrder } ), thunkAPI));

const taskSlice = createSlice({
	name: "tasks",
	initialState: taskAdapter.getInitialState({
		loading: true,
		// error: null
	}),
	reducers: {

		reorderTaskLocal: (state, action) => {

			const updates = action.payload;

			// updates.forEach(u => {

			// 	if (state.entities[u._id]) {
					
			// 		state.entities[u._id].position = u.position;
			// 		state.entities[u._id].listID = u.listID;
			// 	}
			// });
			taskAdapter.upsertMany(state, updates);
		},
	},
	extraReducers: builder => {
		
		builder
		.addCase(fetchTasks.pending, (state) => {

			state.loading = true;
			// state.error = null;
		})
		.addCase(fetchTasks.fulfilled, (state, action) => {

			state.loading = false;
			taskAdapter.setAll(state, action.payload.data);
		})
		.addCase(fetchTasks.rejected, (state, action) => {

			state.loading = false;
			// state.error = action.payload.message;
		})
		.addCase(createTask.fulfilled, (state, action) => {

			taskAdapter.addOne(state, action.payload.data);
		})
		.addCase(updateTask.fulfilled, (state, action) => {

			taskAdapter.upsertOne(state, action.payload.data);
		})
		.addCase(deleteTask.fulfilled, (state, action) => {
			
			const id = action.payload.data._id;
			taskAdapter.removeOne(state, id);
		})
		.addCase(persistReorderTasks.fulfilled, (state, action) => {
		})
		.addCase(persistReorderTasks.rejected, (state, action) => {
			
			state.error = action.payload.message;
		});
	}
});

export { fetchTasks, createTask, updateTask, deleteTask, persistReorderTasks };
export const { reorderTaskLocal } = taskSlice.actions;
export const { selectAll: selectAllTasks, selectById: selectTaskByID, selectIds: selectTaskIDs } = taskAdapter.getSelectors(state => state.tasks);

export default taskSlice.reducer;