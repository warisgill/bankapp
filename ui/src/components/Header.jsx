import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import Cookies from "js-cookie";
import "../index.css";

const CustomNavItems = ({ name, link }) => {
  return (
    <Nav.Item style={{ marginRight: 20 }}>
      <LinkContainer to={link}>
        <Nav.Link className="text-white">
          <span style={{ fontSize: "2.2vh" }}>{name}</span>
        </Nav.Link>
      </LinkContainer>
    </Nav.Item>
  );
};

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const jwtCookie = Cookies.get("jwt");
      if (!jwtCookie) {
        toast.error("No JWT cookie found!");
      } else {
        await logoutApiCall(jwtCookie).unwrap();
        dispatch(logout());
        toast.success("Logged out", {
          className: "toast-container-custom",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
      }
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
              <img src="./src/assets/coin1.png" alt="logo" width="125" height="125"/>
              <strong style={{ fontSize: "4vh" }}>Martian Bank</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title="Accounts"
                    id="accounts"
                    className="custom-nav-dropdown"
                    style={{ fontSize: "2.2vh", marginRight: 30 }}
                  >
                    <LinkContainer to="/">
                      <NavDropdown.Item>
                        <span style={{ fontSize: "1.5vh" }}>My Accounts</span>
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-account">
                      <NavDropdown.Item>
                        <span style={{ fontSize: "1.5vh" }}>New Account</span>
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <CustomNavItems style={{marginRight: 30}} name="Transfer" link="/transfer" />
                  <CustomNavItems style={{marginRight: 30}} name="Transactions" link="/transactions" />
                  <CustomNavItems style={{marginRight: 30}} name="Loans" link="/loan" />
                  <CustomNavItems style={{marginRight: 30}} name="Find ATMs" link="/find-atm" />
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="custom-nav-dropdown"
                    style={{ fontSize: "2.2vh" }}
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
