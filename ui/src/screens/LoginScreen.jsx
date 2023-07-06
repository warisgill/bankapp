import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../index.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Successfully logged in!", {
        className: "toast-container-custom",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
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
        LOGIN
      </h4>

      <Form onSubmit={submitHandler}>
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
          <Form.Text muted style={{fontSize: "1.25vh"}}>Please enter a valid email address.</Form.Text>
        </Form.Group>

        <Form.Group className="my-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
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

        <Button
          disabled={isLoading}
          type="submit"
          variant="dark"
          className="mt-3"
        >
          Login
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="pt-4">
        <Col>
          New Customer? <Link to="/register">Create new account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
