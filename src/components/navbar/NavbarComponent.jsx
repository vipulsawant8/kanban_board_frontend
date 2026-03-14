import { Navbar, Container, Nav, NavbarBrand, NavDropdown, DropdownItem, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/auth";

const NavbarComponent = () => {

	const isAuthenticated  = useSelector(state => state.auth.isAuthenticated);

	if (!isAuthenticated) return;

  return (
	<Navbar bg="dark" variant="dark" expand="lg" className="mb-3 shadow-sm">
		<Container fluid>
			<NavbarBrand className="fw-semibold" as={Link} to={'/board'}> Live board </NavbarBrand>
			<Navbar.Toggle aria-controls="main-navbar" />

<Navbar.Collapse
  id="main-navbar"
  className="justify-content-lg-end justify-content-md-start"
>
  <Nav>
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="user-dropdown">
        Account
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-light">
        <Dropdown.Item as={Link} to="/change-password" className="fw-900">
          Change Password
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item as="div">
          <LogoutButton />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Nav>
</Navbar.Collapse>
		</Container>
	</Navbar>
  );
}

export default NavbarComponent;