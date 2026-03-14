export const getDeviceId = () => {
	let deviceId = localStorage.getItem("deviceId");
	if (!deviceId) {
		deviceId = window.crypto.randomUUID();
		localStorage.setItem("deviceId", deviceId);
	}
	return deviceId;
};

export const clearDeviceId = () => {
	let deviceId = localStorage.getItem("deviceId");
	if (deviceId) {
		localStorage.removeItem("deviceId");
	}	
};