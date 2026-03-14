import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { verifyEmail } from "@/app/features/auth/authSlice.js";
import notify from "@/utils/notify.js";

const VerifyEmailPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(()=> {

        if (!token){ 
            navigate('/login');
            return;
        };

        const verify = async () => {
            try {

                const res = await dispatch(verifyEmail({ token })).unwrap();
                notify.success(res.message);
                navigate('/login');
            } catch (error) {
                const msg = error || "Verify Email Failed";
                notify.error(msg);
            }
        };

        verify();
    }, [token]);

    return (
        <p>Verifying your email...</p>
    );
};

export default VerifyEmailPage;