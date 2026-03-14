import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const ChangePasswordForm = ({ onSubmit, onError, loading , ref }) => {
    const fields = [
        {
			name: "currentPassword",
			label: "Current Password",
			type: "password",
			autoComplete: "new-password"
		},
        {
			name: "newPassword",
			label: "New Password",
			type: "password",
			autoComplete: "new-password"
		}
    ];
    
    const schema = yup.object({
        currentPassword: yup.string().required("Please Enter Current Password"),
        newPassword: yup.string().min(6, "Password must be altes 6 characters long").required("Please Create New Password")
    });
    
    return ( <CustomForm 
        ref={ref}
        fields={fields}
        validationSchema={schema}
        submitLabel={loading ? "Changing..." : "Change"}
        onSubmit={onSubmit}
        onError={onError}
        defaultValues={{ currentPassword: "", newPassword: "" }}
        name="ChangePasswordForm" /> );
};

export default ChangePasswordForm;