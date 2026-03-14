import NavbarComponent from "@/components/navbar/NavbarComponent.jsx";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const AppLayout = () => {

	return ( <> 
		<Container fluid className="p-0">
			<NavbarComponent />
			<Container fluid="lg" className="py-3">
				<Outlet />
			</Container>
		</Container>
	</> );
};

export default AppLayout;