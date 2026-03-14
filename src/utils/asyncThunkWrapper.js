const asyncThunkWraper = async (apiCall, thunkAPI) => {

	try {
		
		const res = await apiCall();
		return res.data;
	} catch (error) {
		
		const msg = error.response?.data?.message || error.message || "Something Failed";
		return thunkAPI.rejectWithValue(msg);
	}
};

export default asyncThunkWraper;