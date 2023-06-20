import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
// import { useLoginMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
// import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AccInfoScreen = () => {
  const [done, setDone] = useState(false);
  const [address, setAddress] = useState("dummy address");
  const [govtId, setGovtId] = useState(["passport"]);
  const [govtIdNo, setGovtIdNo] = useState(12345);
  const [accType, setAccType] = useState(["savings"]);

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const isLoading = false;

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await login({ email, password }).unwrap();
    //   dispatch(setCredentials({ ...res }));
    //   toast.success('Successfully logged in!')
    //   navigate('/');
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <FormContainer>
      <h2
        className="bg-dark mx-3 text-white"
        style={{
          textAlign: "center",
          paddingTop: "1.5vh",
          paddingBottom: "1.5vh",
        }}
      >
        <strong>ACCOUNT &nbsp; DETAILS</strong>
      </h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-4" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your residential address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="govt_id">
          <Form.Label>Govt. ID</Form.Label>
          <Form.Select
            value={govtId}
            disabled={true}
            aria-label="Select your govt. ID"
          >
            <option value="">Select your govt. ID</option>
            <option value="passport">Passport</option>
            <option value="driverLicense">Driver's License</option>
            <option value="aadharCard">SSN</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="my-4" controlId="govt_id_no">
          <Form.Label>Govt. ID number</Form.Label>
          <Form.Control
            type="number"
            min="0"
            isInvalid={govtIdNo < 0}
            onWheel={(e) => e.target.blur()}
            placeholder="Enter your Govt. ID number"
            value={govtIdNo}
            disabled={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4" controlId="acc_type">
          <Form.Label>Account type</Form.Label>
          <Form.Select
            value={accType}
            disabled={true}
            aria-label="Select account type"
          >
            <option value="">Select your account type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </Form.Select>
        </Form.Group>

        <Row className="my-4">
          <Col md={6}>
            <Button
              disabled={isLoading}
              style={{ width: "100%" }}
              type="submit"
              variant="dark"
              className="mt-3 mr-3"
            >
              Submit
            </Button>
          </Col>
          <Col md={6}>
            <Link to="/">
              <Button
                disabled={isLoading}
                style={{ width: "100%" }}
                type="submit"
                variant="dark"
                className="mt-3 mr-3"
              >
                Go Back
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default AccInfoScreen;
