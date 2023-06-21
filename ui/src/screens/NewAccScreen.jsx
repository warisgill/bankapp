import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAccountMutation } from "../slices/accountApiSlice";
import { createAccount } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const NewAccScreen = () => {
  const [address, setAddress] = useState('');
  const [govtId, setGovtId] = useState('');
  const [govtIdNo, setGovtIdNo] = useState('');
  const [accType, setAccType] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createNewAccount, { isLoading }] = useCreateAccountMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try{

      const data = new FormData();
      data.append("name", userInfo.name);
      data.append("email_id", userInfo.email);
      data.append("address", address);
      data.append("government_id_type", govtId);
      data.append("govt_id_number", govtIdNo);
      data.append("account_type", accType);

      // const data = {
      //   "name": userInfo.name,
      //   "email_id": userInfo.email,
      //   "address": address,
      //   "government_id_type": govtId,
      //   "govt_id_number": govtIdNo,
      //   "account_type": accType
      // }

      // console.log(data)

      // fetch('http://127.0.0.1:5000/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   body: data,
      // })
      // .then(response => response.json())
      // .then(data => console.log(data));
      
      const res = await createNewAccount(data).unwrap();
      console.log(res);
      dispatch(createAccount({ ...res }));
      toast.success('Successfully created a new account!')
      navigate('/');
    }
    catch(err){
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
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
        <strong>NEW <span>&nbsp;</span> ACCOUNT</strong>
      </h2>
      {isLoading? <Loader /> : 
      <Form onSubmit={submitHandler}>

        <Row className="mt-4">
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
          <Form.Group className="my-3" controlId="acc_type">
            <Form.Label>Account type</Form.Label>
            <Form.Select
              value={accType}
              multiple={false}
              onChange={(e) => setAccType(e.target.value)}
              aria-label="Select account type"
            >
              <option value="">Select your account type</option>
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="my-3" controlId="govt_id">
              <Form.Label>Govt. ID</Form.Label>
              <Form.Select
                value={govtId}
                multiple={false}
                onChange={(e) => setGovtId(e.target.value)}
                aria-label="Select your govt. ID"
              >
                <option value="">Select your govt. ID</option>
                <option value="passport">Passport</option>
                <option value="driverLicense">Driver's License</option>
                <option value="aadharCard">SSN</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="my-3" controlId="govt_id_no">
                <Form.Label>Govt. ID number</Form.Label>
                <Form.Control
                  type="text"
                  min="0"
                  placeholder="Enter your Govt. ID number"
                  value={govtIdNo}
                  onChange={(e) => setGovtIdNo(e.target.value)}
                />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group className="my-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your residential address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Col md={8}>
            <Button
            style={{ width: "100%" }}
            type="submit"
            variant="dark"
            className="mt-5 mr-3"
            >
              Create Account
            </Button>
          </Col>
          <Col md={4}>
            <Link to="/">
                <Button
                  style={{ width: "100%" }}
                  type="submit"
                  variant="dark"
                  className="mt-5 mr-3"
                >
                  Go Back
                </Button>
              </Link>
          </Col>
        </Row>
        
      </Form>
      }
    </FormContainer>
  );
};

export default NewAccScreen;
