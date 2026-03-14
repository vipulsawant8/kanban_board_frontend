import { ChangePasswordForm } from "../../components/auth/index.js";
import { Card, CardBody, CardTitle, Col, Container, Row } from "react-bootstrap";

import { changePassword } from "../../app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";
import notify from "@/utils/notify";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {

    const formRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleChangePassword = async (data) => {
            try {
                const res = await dispatch(changePassword(data)).unwrap();
                notify.success(res.message);
                formRef.current.resetForm();
                navigate('/login');
            } catch (error) {
                
                const msg = error || "Change Password Failed";
                notify.error(msg);
            }
    };

    const handleError = (errors) => {
        if (import.meta.env.DEV) console.log("Change Password Form errors :", errors);
    };

    return ( <Container className="py-4">
        <Row className="justify-content-center">
            <Col xs={12} sm={10} md={6} lg={4}>
                <Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px"  }}>
                    <CardBody>
                        <CardTitle className="text-center h1"> <h1> Change Password </h1> </CardTitle>
                        <ChangePasswordForm
                            ref={formRef} onSubmit={handleChangePassword} onError={handleError} loading={loading} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container> );
};

export default ChangePasswordPage;