import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";
import { useSearchParams } from "react-router-dom";

const ResetPasswordForm = ({ onSubmit, onError, loading , ref }) => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const fields = [
        {
            name: "newPassword",
            label: "New Password",
            type: "password",
            autoComplete: "new-password"
        }
    ];
    
    const schema = yup.object({
        newPassword: yup.string().min(6, "Password must be altes 6 characters long").required("Please Create New Password")
    });
    
    return ( <CustomForm 
        ref={ref}
        fields={fields}
        validationSchema={schema}
        submitLabel={loading ? "Reset..." : "Reset"}
        onSubmit={onSubmit}
        onError={onError}
        defaultValues={{ token, newPassword: "" }}
        name="ResetPasswordForm" /> );
};

export default ResetPasswordForm;