import { toast } from "react-toastify";
import { toastConfig } from "../config/toast.config.js";

const notify = {

	info: (msg, opts={}) => toast.info(msg, { ...toastConfig, ...opts }),
	success: (msg, opts={}) => toast.success(msg, { ...toastConfig, ...opts }),
	error: (msg, opts={}) => toast.error(msg, { ...toastConfig, ...opts }),
	warn: (msg, opts={}) => toast.warn(msg, { ...toastConfig, ...opts })
};

export default notify;