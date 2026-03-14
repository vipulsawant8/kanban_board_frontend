import { Button } from "react-bootstrap";

const SubmitButton = ({ label="Submit", variant="primary", name, type="outside" }) => {
	
	return (
			<Button type="submit" className={`m-3 ${type}`} id={`${name}-btn`} variant={variant}> {label} </Button>
	);
}

export default SubmitButton;