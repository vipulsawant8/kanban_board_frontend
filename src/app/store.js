import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/app/features/auth/authSlice.js";
import listReducer from '@/app/features/lists/listSlice.js';
import taskReducer from "@/app/features/tasks/taskSlice.js";

import errorMiddleware from "@/middleware/errorMiddleware.js";
import { createLogger } from "redux-logger";

const logger = createLogger({
	level: 'info',
	collapsed: true
});

const store = configureStore({
	reducer:{

		auth: authReducer,
		lists: listReducer,
		tasks: taskReducer
	},
	middleware: (getDefaultMiddleware) => import.meta.env.DEV ?
		getDefaultMiddleware().concat(errorMiddleware, logger) :
		getDefaultMiddleware().concat(errorMiddleware),
	devTools: import.meta.env.DEV	
});

export default store;