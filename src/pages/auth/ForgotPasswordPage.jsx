import { ForgotPasswordForm } from "../../components/auth/index.js";
import { Card, CardBody, CardTitle, Col, Container, Row } from "react-bootstrap";

import { forgotPassword } from "../../app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";
import notify from "@/utils/notify";

const CreateUserAccountPage = () => {

    const formRef = useRef();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleForgotPassword = async (data) => {
            try {
                const res = await dispatch(forgotPassword(data)).unwrap();
                notify.success(res.message);
                formRef.current.resetForm();
            } catch (error) {
                
                const msg = error || "Forgot Password Failed";
                notify.error(msg);
            }
    };

    const handleError = (errors) => {
        if (import.meta.env.DEV) console.log("Forgot Password Form errors :", errors);
    };

    return ( <Container className="py-4">
        <Row className="justify-content-center">
            <Col xs={12} sm={10} md={6} lg={4}>
                <Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px"  }}>
                    <CardBody>
                        <CardTitle className="text-center h1"> <h1> Forgot Password </h1> </CardTitle>
                        <ForgotPasswordForm
                            ref={formRef} onSubmit={handleForgotPassword} onError={handleError} loading={loading} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container> );
};

export default CreateUserAccountPage;