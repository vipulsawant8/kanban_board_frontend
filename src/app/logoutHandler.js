let logoutCallback = null;

export const setLogoutHandler = (callback) => {
	logoutCallback = callback;
};

export const triggerLogout = () => {
	if (logoutCallback) {
		logoutCallback();
	}
};