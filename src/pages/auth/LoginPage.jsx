import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row, CardHeader, CardFooter } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "@/components/auth";
import { loginUser } from "@/app/features/auth/authSlice.js";

import notify from "@/utils/notify.js";

const LoginPage = () => {
	const formRef = useRef();
	const { loading, isAuthenticated } = useSelector((state) => state.auth);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (data) => {
		try {
			await dispatch(loginUser(data)).unwrap();
			
			notify.success("Login Successful");
		} catch (error) {
			
			const msg = error || "Login Failed";
			notify.error(msg);
		}
	};

	const handleError = (errors) => {
		if (import.meta.env.DEV) console.log("Login Form errors :", errors);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/board', { replace: true });
		}}, [navigate, isAuthenticated]);

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={6} lg={4}>
					<Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px" }}>
						<CardBody>
							<CardTitle className="text-center h1"> <h1> Login </h1> </CardTitle>
							<LoginForm 
								ref={formRef}
								onSubmit={handleLogin}
								onError={handleError}
								loading={loading} />
								<Link to={'/forgot-password'}>forgot password?</Link>
							<div className="mt-4"> New user? click <Link to={'/create-account'}> here </Link> to register.</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;