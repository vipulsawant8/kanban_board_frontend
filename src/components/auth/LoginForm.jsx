import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";
import { getDeviceId } from "../../utils/deviceId.js";

const LoginForm = ({ onSubmit, onError, loading, ref } ) => {

	const fields = [
		{
			name: "identity",
			label: "E-mail",
			type: "email",
			autoComplete: "email"
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			autoComplete: "current-password"
		}
	];

	const schema = yup.object({
		identity: yup.string().email().required(),
		password: yup.string().required()
	});

  	return ( <CustomForm 
		ref={ref}
		fields={fields}
		validationSchema={schema}
		submitLabel={loading ? "Logging..." : "Login"}
		onSubmit={onSubmit}
		onError={onError}
		defaultValues={{ deviceId: getDeviceId() }}
		name="loginForm" /> );
};

export default LoginForm;