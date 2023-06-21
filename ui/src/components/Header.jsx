import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        varient="dark"
        expand="lg"
        collapseOnSelect
        style={{ height: "10vh" }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-white text-uppercase">
              <strong style={{ fontSize: "4vh" }}>Martian Bank</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item style={{ marginRight: 40 }}>
                <LinkContainer to="/find-atm">
                  <Nav.Link className="text-white">
                    <span style={{ fontSize: "2.5vh" }}>Find ATMs</span>
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              {userInfo ? (
                <>
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="custom-nav-dropdown"
                    style={{ fontSize: "2.5vh" }}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <span style={{ fontSize: "1.5vh" }}>Personal Info</span>
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavDropdown.Item onClick={logoutHandler}>
                        <span style={{ fontSize: "1.5vh" }}>Logout</span>
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Item style={{ marginRight: 40 }}>
                    <LinkContainer to="/register">
                      <Nav.Link className="text-white">
                        <span style={{ fontSize: "2.5vh" }}>Sign Up</span>
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item style={{ marginRight: 40 }}>
                    <LinkContainer to="/login">
                      <Nav.Link className="text-white">
                        <span style={{ fontSize: "2.5vh" }}>Login</span>
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
