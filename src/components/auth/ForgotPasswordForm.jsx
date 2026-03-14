import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const ForgotPasswordForm = ({ onSubmit, onError, loading , ref }) => {
    const fields = [
        {
            name: "email",
            label: "E-mail",
            type: "email",
            autoComplete: "email"
        }
    ];
    
    const schema = yup.object({
        email: yup.string().email().required()
    });
    
    return ( <CustomForm 
        ref={ref}
        fields={fields}
        validationSchema={schema}
        submitLabel={loading ? "Veriying..." : "Verify"}
        onSubmit={onSubmit}
        onError={onError}
        defaultValues={{ email: "" }}
        name="ForgotPasswordForm" /> );
};

export default ForgotPasswordForm;