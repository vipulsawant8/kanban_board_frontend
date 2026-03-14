import { CreateUserAccountForm } from "../../components/auth/index.js";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row } from "react-bootstrap";

import { createUserAccount } from "@/app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";
import notify from "@/utils/notify";

const CreateUserAccountPage = () => {

	const formRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	const handleCreateAccount = async (data) => {
			try {
				const res = await dispatch(createUserAccount(data)).unwrap();
				notify.success(res.message);
				console.log("formRef: ", formRef);
				formRef.current.resetForm();
			} catch (error) {
				
				const msg = error || "Account Creattion Failed";
				notify.error(msg);
			}
	};

	const handleError = (errors) => {
		if (import.meta.env.DEV) console.log("Create User Account Form errors :", errors);
	};

	return ( <Container className="py-4">
		<Row className="justify-content-center">
			<Col xs={12} sm={10} md={6} lg={4}>
				<Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px"  }}>
					<CardBody>
						<CardTitle className="text-center h1"> <h1> Create Account </h1> </CardTitle>
						<CreateUserAccountForm
							ref={formRef} onSubmit={handleCreateAccount} onError={handleError} loading={loading} />
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container> );
};

export default CreateUserAccountPage;