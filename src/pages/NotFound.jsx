import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
	<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "60vh" }}>
			<h2 className="h-2"> 404 - Page not found </h2>
			<p className="text-muted mb-4">
				The page you are looking for does not exist. <br />
				<Button as={Link} to="/login" variant="link"> Go back to Home </Button>
			</p>
		</div>
  )
}

export default NotFound;