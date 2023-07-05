import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAccountMutation } from "../slices/accountApiSlice";
import { createAccount } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../index.css";

const NewAccScreen = () => {
  const [address, setAddress] = useState("");
  const [govtId, setGovtId] = useState("");
  const [govtIdNo, setGovtIdNo] = useState("");
  const [accType, setAccType] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createNewAccount, { isLoading }] = useCreateAccountMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", userInfo.name);
      data.append("email_id", userInfo.email);
      data.append("address", address);
      data.append("government_id_type", govtId);
      data.append("govt_id_number", govtIdNo);
      data.append("account_type", accType);

      const res = await createNewAccount(data).unwrap();
      console.log(res);
      dispatch(createAccount(res));
      toast.success('Congratulations, your account has been created! We have also given you a $100 joining bonus', {
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
      console.log(err);
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

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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
        <strong>
          NEW <span>&nbsp;</span> ACCOUNT
        </strong>
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Form>
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
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Investment">Investment</option>
                <option value="Money Market">Money Market</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="my-3" controlId="govt_id">
                <Form.Label>ID type</Form.Label>
                <Form.Select
                  value={govtId}
                  multiple={false}
                  onChange={(e) => setGovtId(e.target.value)}
                  aria-label="Select your ID type"
                >
                  <option value="">Select your ID type</option>
                  <option value="Passport">Passport</option>
                  <option value="DriverLicense">Driver's License</option>
                  <option value="AadharCard">SSN</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3" controlId="govt_id_no">
                <Form.Label>ID number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your ID number"
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
            <Col>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Group controlId="checkbox">
                  <Form.Check
                    type="checkbox"
                    label="I have read the "
                    checked={isCheckboxChecked}
                    onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                    required
                  />
                </Form.Group>
                <div
                  onClick={handleModalOpen}
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  <span>&nbsp;</span> Terms and Conditions
                </div>
                <Modal show={showModal} onHide={handleModalClose} centered size='xl'>
                  <Modal.Header closeButton>
                    <Modal.Title> Terms and Conditions</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Welcome to Martian Bank! By opening an account with us,
                      you agree to the following terms and conditions:
                    </p>

                    <h3>1. Eligibility</h3>
                    <p>
                      To open an account with Martian Bank, you must be a
                      resident of Mars and at least 18 years old. You may be
                      required to provide proof of identity and other supporting
                      documents.
                    </p>

                    <h3>2. Account Information</h3>
                    <p>
                      You are responsible for providing accurate and up-to-date
                      information during the account opening process. It is
                      essential to keep your account information confidential
                      and not share it with others.
                    </p>

                    <h3>3. Fees and Charges</h3>
                    <p>
                      Martian Bank may impose fees and charges for certain
                      account services. These fees will be disclosed to you
                      during the account opening process and may be subject to
                      change. It is your responsibility to review and understand
                      the applicable fees.
                    </p>

                    <h3>4. Termination</h3>
                    <p>
                      Martian Bank reserves the right to terminate or suspend
                      your account if you violate the terms and conditions or
                      engage in fraudulent or illegal activities. You may also
                      request to close your account at any time, subject to any
                      outstanding obligations.
                    </p>

                    <p>
                      By opening an account with Martian Bank, you acknowledge
                      that you have read, understood, and agreed to these Terms
                      and Conditions. If you have any questions or concerns,
                      please contact our customer support team.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="dark" onClick={handleModalClose}>
                      Agree
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Link to="/">
                <Button
                  style={{ width: "100%" }}
                  variant="dark"
                  className="mt-5"
                >
                  Cancel
                </Button>
              </Link>
            </Col>

            <Col md={6}>
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="dark"
                className="mt-5 mr-3"
                onClick={submitHandler}
              >
                Create Account
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default NewAccScreen;
