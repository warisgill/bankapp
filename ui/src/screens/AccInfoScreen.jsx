import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, DropdownButton } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";

const AccInfoScreen = () => {

  let currentAccount = useSelector((state) => state.account.current_account);
  const { userInfo } = useSelector((state) => state.auth);

  console.log("Current account: ", currentAccount)

  if (!currentAccount) {
    currentAccount = {
      accountType: "",
      accountNumber: "",
      balance: "",
      address: "",
      govtId: "",
      govtIdNo: "",
    }
  }

  const [accType, setAccType] = useState(currentAccount.accountType);
  const [accNo, setAccNo] = useState(currentAccount.accountNumber);
  const [balance, setBalance] = useState(currentAccount.balance);
  const [address, setAddress] = useState(currentAccount.address);
  const [govtId, setGovtId] = useState(currentAccount.governmentIdType);
  const [govtIdNo, setGovtIdNo] = useState(currentAccount.govtIdNumber);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          marginBottom: "3vh",
        }}
      >
        ACCOUNT &nbsp; DETAILS
      </h2>

      <Form>
        <Row>
          <Col md={4}>
            <DropdownButton
              id="acc_type"
              className="mt-5"
              variant="dark"
              title={accType ? accType : 'Error'}
              disabled
              style={{ width: "100%" }}
            />
          </Col>
          <Col md={8}>
            <Form.Group className="my-3" controlId="acc_no">
              <Form.Label>Account number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your account number"
                value={accNo? accNo : "Error"}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="m3-4">
          <Col md={6}>
            <Form.Group className="my-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={userInfo.name}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="my-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={userInfo.email}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="my-3" controlId="govt_id">
              <Form.Label>Govt. ID</Form.Label>
              <Form.Select
                value={govtId? govtId : "Error"}
                multiple={false}
                disabled
              >
                {console.log(govtId)}
                <option value="">Select your govt. ID</option>
                <option value="Passport">Passport</option>
                <option value="Driver License">Driver's License</option>
                <option value="Aadhar Card">SSN</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="my-3" controlId="govt_id_no">
              <Form.Label>Govt. ID number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Govt. ID number"
                value={govtIdNo? govtIdNo : "Error"}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="my-3" controlId="balance">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your balance"
                value={balance? `$ ${balance}` : "Error"}
                disabled
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={8}>
          <Form.Group className="my-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your residential address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          </Col>
        </Row>

        <Row className="my-4">
          <Col md={6}>
            <Button
              disabled={isLoading}
              style={{ width: "100%" }}
              type="submit"
              onClick={submitHandler}
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
