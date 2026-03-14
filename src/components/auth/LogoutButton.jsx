import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/features/auth/authSlice.js";
import { Button } from "react-bootstrap";
import notify from "../../utils/notify";

const LogoutButton = () => {

	const dispatch = useDispatch();

	const handleLogout = async () => {

		try {
			
			const logout = await dispatch(logoutUser()).unwrap();
			const msg = "Logged-out Successfully";
			notify.success(msg);
		} catch (error) {
			
			const msg = error || "Logout failed. Please try again.";
			notify.error(msg);
		}
	};

  return (
	<Button variant="outline-danger" className="align-self-start" onClick={handleLogout}> Logout </Button>
  );
};

export default LogoutButton;