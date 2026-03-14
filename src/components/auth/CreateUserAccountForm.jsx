import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";
import { useEffect } from "react";
// import { forwardRef } from "react";

const CreateUserAccount = ({ onSubmit, onError, loading , ref}) => {
	const fields = [
        {
            name: "email",
            label: "E-mail",
            type: "email",
            autoComplete: "email"
        },
		{
			name: "name",
			label: "Name",
			type: "text"
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			autoComplete: "new-password"
		}
	];
	
	const schema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		password: yup.string().min(6).required()
	});
	
	return ( <CustomForm 
		ref={ref}
		fields={fields}
		validationSchema={schema}
		submitLabel={loading ? "Creating..." : "Create"}
		onSubmit={onSubmit}
		onError={onError}
		defaultValues={{ email: "", name: "", password: "" }}
		name="CreateUserAccountForm" /> );
};

export default CreateUserAccount;