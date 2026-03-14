import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMe } from "@/app/features/auth/authSlice.js";

const AuthInitializer = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		
		dispatch(getMe());
	}, []);

	return null;
};

export default AuthInitializer;