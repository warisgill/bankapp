import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Modal,
  Card,
  Badge,
  Container,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAccountMutation } from "../slices/accountApiSlice";
import { createAccount } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CustomCard = ({ title, text, icon, link }) => {
  return (

      <Card
        className="custom-card"
        style={{
          marginTop: "2vh",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "invert(2%)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "2.5vh" }}>
            <strong>{title}</strong>
          </Card.Title>
          <Card.Text style={{ fontSize: "1.5vh" }}>{text}</Card.Text>
        </Card.Body>
        <style>
          {`
                .custom-card:hover .card-body{
                  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
                }
                .custom-card:hover .position-absolute{
                  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
                }
              `}
        </style>
      </Card>
  );
};

const LoanScreen = () => {
  const [accNo, setAccNo] = useState("");
  const [address, setAddress] = useState("");
  const [govtId, setGovtId] = useState("");
  const [govtIdNo, setGovtIdNo] = useState("");
  const [accType, setAccType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanType, setLoanType] = useState("");
  const [intRate, setIntRate] = useState("");
  const [loanTime, setLoanTime] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const [createNewAccount, { isLoading }] = useCreateAccountMutation();
  const isLoading = false;

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      //   const data = new FormData();
      //   data.append("name", userInfo.name);
      //   data.append("email_id", userInfo.email);
      //   data.append("address", address);
      //   data.append("government_id_type", govtId);
      //   data.append("govt_id_number", govtIdNo);
      //   data.append("account_type", accType);
      //   const res = await createNewAccount(data).unwrap();
      //   console.log(res);
      //   dispatch(createAccount(res));
      //   toast.success("Successfully created a new account!");
      //   navigate("/");
    } catch (err) {
      //   console.log(err);
      //   toast.error(err?.data?.message || err.error);
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
    <Row fluid style={{ overflowY: "auto" }}>
        <Col md={1} />
      <Col md={6} className="mt-5">
        <Container
          xs={12}
          md={6}
          className="card p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "invert(2%)",
          }}
        >
          <h2
            className="bg-dark mx-3 text-white"
            style={{
              textAlign: "center",
              paddingTop: "1.5vh",
              paddingBottom: "1.5vh",
            }}
          >
            <strong>
              NEW <span>&nbsp;</span> LOAN
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
                <Col md={4}>
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
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group className="my-3" controlId="acc_no">
                    <Form.Label>Account number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your account number"
                      value={accNo}
                      onChange={(e) => setAccNo(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="my-3" controlId="govt_id">
                    <Form.Label>Govt. ID</Form.Label>
                    <Form.Select
                      value={govtId}
                      multiple={false}
                      onChange={(e) => setGovtId(e.target.value)}
                      aria-label="Select your govt. ID"
                    >
                      <option value="">Select your govt. ID</option>
                      <option value="Passport">Passport</option>
                      <option value="DriverLicense">Driver's License</option>
                      <option value="AadharCard">SSN</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group className="my-3" controlId="govt_id_no">
                    <Form.Label>Govt. ID number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Govt. ID number"
                      value={govtIdNo}
                      onChange={(e) => setGovtIdNo(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="my-3" controlId="loan_type">
                    <Form.Label>Loan type</Form.Label>
                    <Form.Select
                      value={loanType}
                      multiple={false}
                      onChange={(e) => setLoanType(e.target.value)}
                      aria-label="Select loan type"
                    >
                      <option value="">Select your loan type</option>
                      <option value="Home">Home</option>
                      <option value="Car">Car</option>
                      <option value="Personal">Personal</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="my-3" controlId="loan_amount">
                    <Form.Label>Loan amount</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Enter the loan amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="my-3" controlId="loan_type">
                    <Form.Label>Interest Rate</Form.Label>
                    <Form.Control
                      value={intRate}
                      type="number"
                      min="0"
                      placeholder="Enter the interest rate"
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => setIntRate(e.target.value)}
                      aria-label="Select loan type"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="my-3" controlId="loan_amount">
                    <Form.Label>Time Period</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Enter the time period in years"
                      value={loanTime}
                      onChange={(e) => setLoanTime(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div
                    onClick={handleModalOpen}
                    style={{ textDecoration: "underline", color: "blue" }}
                  >
                    *Terms and Conditions
                  </div>
                  <Modal show={showModal} onHide={handleModalClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Terms and Conditions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Welcome to Martian Bank! By applying for a loan with us,
                        you agree to the following terms and conditions:
                      </p>

                      <h3>1. Eligibility</h3>
                      <p>
                        To apply for a loan at Martian Bank, you must meet
                        certain eligibility criteria. These criteria include but
                        are not limited to: being a resident of Mars, having a
                        minimum age of 21 years, and meeting the required
                        creditworthiness standards set by Martian Bank.
                        Additional documentation and information may be required
                        during the loan application process.
                      </p>

                      <h3>2. Loan Terms</h3>
                      <p>
                        The loan terms, including the loan amount, interest
                        rate, repayment period, and any applicable fees, will be
                        provided to you during the loan application process. It
                        is important to carefully review and understand these
                        terms before accepting the loan offer. Any changes to
                        the loan terms will be communicated to you in a timely
                        manner.
                      </p>

                      <h3>3. Repayment</h3>
                      <p>
                        As a borrower, you are responsible for making timely
                        repayments as agreed upon in the loan agreement. Failure
                        to make payments on time may result in additional
                        charges, penalties, and potential damage to your credit
                        history. It is essential to manage your finances
                        responsibly and ensure sufficient funds are available
                        for loan repayments.
                      </p>

                      <h3>4. Default and Remedies</h3>
                      <p>
                        If you default on your loan payments, Martian Bank
                        reserves the right to take necessary actions to recover
                        the outstanding amount. This may include but is not
                        limited to reporting the default to credit agencies,
                        initiating legal proceedings, and engaging third-party
                        collection agencies. It is crucial to communicate with
                        Martian Bank in case of financial difficulties to
                        explore possible solutions and avoid default.
                      </p>

                      <p>
                        By applying for a loan with Martian Bank, you
                        acknowledge that you have read, understood, and agreed
                        to these Terms and Conditions. If you have any questions
                        or concerns, please contact our customer support team.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="dark" onClick={handleModalClose}>
                        Agree
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
        </Container>
      </Col>
      <Col md={1} />
      <Col md={4} className="mt-5">
        <Card>
          <Card.Header
            style={{ fontSize: "3vh" }}
            className="bg-dark text-white"
          >
            <strong>Approved Loans</strong>
          </Card.Header>
        </Card>
        <CustomCard
          title="Home Loan: $10,000"
          text="Interest Rate: 5%, Time Period: 5 years"
        />
      </Col>
    </Row>
  );
};

export default LoanScreen;