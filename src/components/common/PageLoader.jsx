import { Spinner } from "react-bootstrap";

const PageLoader = () => {
	return (<div className="d-flex justify-content-center align-items-center" id="loader" style={{ height: "40vh" }}>
			<Spinner animation="border" role="status" />
		</div>)
};

export default PageLoader;