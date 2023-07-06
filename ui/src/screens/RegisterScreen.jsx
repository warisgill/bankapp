import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import "../index.css";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        console.log(res)
        dispatch(setCredentials({ ...res }));
        toast.success("Congratulations! Your account with Martian Bank has been created.", {
          className: "toast-container-custom",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error, {
          className: "toast-container-custom",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <FormContainer position="left">
      <h4
        className="bg-dark mx-3 text-white"
        style={{
          textAlign: "center",
          paddingTop: "1.5vh",
          paddingBottom: "1.5vh",
        }}
      >
        SIGN &nbsp; UP
      </h4>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-4" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Text muted style={{fontSize: "1.25vh"}}>
            Please enter a valid email address.
          </Form.Text>
        </Form.Group>

        <Form.Group className="my-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Text muted style={{fontSize: "1.25vh"}}>
            Password must include:
            <div>1. at least 8 characters</div>
            <div>2. at least one uppercase letter</div>
            <div>3. at least one lowercase letter</div>
            <div>4. at least one digit</div>
            <div>5. at least one special character (@$!%*#?&)</div>
          </Form.Text>
        </Form.Group>
        <Form.Group className="my-4" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="dark" className="mt-3">
          Submit Request
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="pt-4">
        <Col style={{fontSize: "1.25vh"}}>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
