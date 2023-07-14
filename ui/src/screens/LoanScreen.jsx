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
import {
  usePostLoanMutation,
  useGetApprovedLoansMutation,
} from "../slices/loanApiSlice";
import { createLoan, storeLoanHistory } from "../slices/loanSlice";
import { useGetAllAccountsMutation } from "../slices/accountApiSlice";
import { getAccounts } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../index.css";

const CustomCard = ({ title, text, icon, link }) => {
  return (
    <Card
      className="custom-card"
      style={{
        marginTop: "1.25vh",
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "2vh" }} className="text-center">
          <strong>{title}</strong>
        </Card.Title>
        <Card.Text style={{ fontSize: "1.25vh" }} className="text-center">
          {text}
        </Card.Text>
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
  const [accType, setAccType] = useState("");

  const [govtId, setGovtId] = useState("");
  const [govtIdNo, setGovtIdNo] = useState("");

  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const [intRate, setIntRate] = useState("");
  const [loanTime, setLoanTime] = useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [loanAdded, setLoanAdded] = useState(false);

  const loanInfo = useSelector((state) => state.loan.loan_history).response;
  let allAccounts = useSelector((state) => state.account.all_accounts).response;
  if (!allAccounts) {
    allAccounts = [];
  }

  const [selectedAccount, setSelectedAccount] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const terms = {
    BaseCamp: {
      interestRate: 5.99,
      timePeriod: 10,
    },
    Rover: {
      interestRate: 6.5,
      timePeriod: 5,
    },
    PotatoFarming: {
      interestRate: 7.25,
      timePeriod: 7,
    },
    IceHome: {
      interestRate: 8.75,
      timePeriod: 15,
    },
    Rocket: {
      interestRate: 9.99,
      timePeriod: 20,
    },
  };

  const [postLoanAPI, { isLoading }] = usePostLoanMutation();
  const [loanHistoryAPI, { isLoading: isLoading2 }] =
    useGetApprovedLoansMutation();
  const [getAllAccounts, { isLoading: isLoading1 }] =
    useGetAllAccountsMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }

    try {
      const data_loan = new FormData();
      data_loan.append("name", userInfo.name);
      data_loan.append("email", userInfo.email);
      data_loan.append("account_number", accNo);
      data_loan.append("account_type", accType);
      data_loan.append("govt_id_number", govtIdNo);
      data_loan.append("govt_id_type", govtId);
      data_loan.append("loan_type", loanType);
      data_loan.append("loan_amount", loanAmount);
      data_loan.append("interest_rate", intRate);
      data_loan.append("time_period", loanTime);
      const res = await postLoanAPI(data_loan).unwrap();
      console.log(res);
      dispatch(createLoan(res));
      toast.success("Congratulations! Your loan is approved!", {
        className: "toast-container-custom",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoanAdded(true);
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

  const fetchLoans = async () => {
    const data = new FormData();
    data.append("email", userInfo.email);
    const res = await loanHistoryAPI(data).unwrap();
    console.log(res);
    dispatch(storeLoanHistory(res));
  };

  const fetchAccounts = async () => {
    const data = new FormData();
    data.append("email_id", userInfo.email);
    const res = await getAllAccounts(data).unwrap();
    dispatch(getAccounts(res));
  };

  useEffect(() => {
    try {
      fetchAccounts();
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching accounts!", {
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
  }, []);

  useEffect(() => {
    try {
      fetchLoans();
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching loans!", {
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
  }, [loanAdded]);

  return (
    <Row fluid style={{ overflowY: "auto" }}>
      <Col md={1} />
      <Col md={6} className="mt-5">
        <Container xs={12} md={6} className="card p-5">
          <h4
            className="bg-dark mx-3 text-white"
            style={{
              textAlign: "center",
              paddingTop: "1.5vh",
              paddingBottom: "1.5vh",
            }}
          >
            NEW <span>&nbsp;</span> LOAN
          </h4>
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
                      disabled={accType ? true : false}
                    >
                      <option value="">Select your account type</option>
                      <option value="Savings">Savings</option>
                      <option value="Checking">Checking</option>
                      <option value="Investment">Investment</option>
                      <option value="Money Market">Money Market</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group className="my-3" controlId="acc_no">
                    <Form.Label>Account number</Form.Label>
                    <Form.Select
                      value={accNo ? accNo : "Select Account"}
                      onChange={(e) => {
                        const selectedAccountNumber = e.target.value;
                        const selectedAccount = allAccounts.find(
                          (account) =>
                            account.accountNumber === selectedAccountNumber
                        );
                        setAccNo(selectedAccountNumber);
                        setAccType(
                          selectedAccount ? selectedAccount.accountType : null
                        );
                        setGovtId(
                          selectedAccount
                            ? selectedAccount.governmentIdType
                            : null
                        );
                        setGovtIdNo(
                          selectedAccount ? selectedAccount.govtIdNumber : null
                        );
                      }}
                      aria-label="Select account number"
                    >
                      <option value="">Select your account number</option>
                      {allAccounts.map((account) => (
                        <option value={account.accountNumber}>
                          {account.accountNumber}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="my-3" controlId="govt_id">
                    <Form.Label>ID Type</Form.Label>
                    <Form.Select
                      value={govtId}
                      required
                      multiple={false}
                      onChange={(e) => setGovtId(e.target.value)}
                      aria-label="Select your ID type"
                      disabled={govtId ? true : false}
                    >
                      <option value="">Select your ID type</option>
                      <option value="Passport">Passport</option>
                      <option value="DriverLicense">Driver's License</option>
                      <option value="AadharCard">SSN</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group className="my-3" controlId="govt_id_no">
                    <Form.Label>ID number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your ID number"
                      required
                      value={govtIdNo}
                      onChange={(e) => setGovtIdNo(e.target.value)}
                      disabled={govtIdNo ? true : false}
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
                      onChange={(e) => {
                        const selectedLoanType = e.target.value;
                        setIntRate(terms[selectedLoanType].interestRate);
                        setLoanTime(terms[selectedLoanType].timePeriod);
                        setLoanType(e.target.value);
                      }}
                      aria-label="Select loan type"
                    >
                      <option value="">Select your loan type</option>
                      <option value="BaseCamp">Base Camp</option>
                      <option value="Rover">Rover</option>
                      <option value="PotatoFarming">Potato Farming</option>
                      <option value="IceHome">Ice Home</option>
                      <option value="Rocket">Rocket</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="my-3" controlId="loan_amount">
                    <Form.Label>Loan amount</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      required
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
                      min="5"
                      required
                      disabled
                      placeholder="Select loan type"
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
                      required
                      disabled
                      placeholder="Select loan type"
                      value={loanTime}
                      onChange={(e) => setLoanTime(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                    ></Form.Control>
                  </Form.Group>
                </Col>
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
                    <Modal
                      show={showModal}
                      onHide={handleModalClose}
                      centered
                      size="xl"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Terms and Conditions</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Welcome to Martian Bank! By applying for a loan with
                          us, you agree to the following terms and conditions:
                        </p>

                        <h3>1. Eligibility</h3>
                        <p>
                          To apply for a loan at Martian Bank, you must meet
                          certain eligibility criteria. These criteria include
                          but are not limited to: being a resident of Mars,
                          having a minimum age of 21 years, and meeting the
                          required creditworthiness standards set by Martian
                          Bank. Additional documentation and information may be
                          required during the loan application process.
                        </p>

                        <h3>2. Loan Terms</h3>
                        <p>
                          The loan terms, including the loan amount, interest
                          rate, repayment period, and any applicable fees, will
                          be provided to you during the loan application
                          process. It is important to carefully review and
                          understand these terms before accepting the loan
                          offer. Any changes to the loan terms will be
                          communicated to you in a timely manner.
                        </p>

                        <h3>3. Repayment</h3>
                        <p>
                          As a borrower, you are responsible for making timely
                          repayments as agreed upon in the loan agreement.
                          Failure to make payments on time may result in
                          additional charges, penalties, and potential damage to
                          your credit history. It is essential to manage your
                          finances responsibly and ensure sufficient funds are
                          available for loan repayments.
                        </p>

                        <h3>4. Default and Remedies</h3>
                        <p>
                          If you default on your loan payments, Martian Bank
                          reserves the right to take necessary actions to
                          recover the outstanding amount. This may include but
                          is not limited to reporting the default to credit
                          agencies, initiating legal proceedings, and engaging
                          third-party collection agencies. It is crucial to
                          communicate with Martian Bank in case of financial
                          difficulties to explore possible solutions and avoid
                          default.
                        </p>

                        <p>
                          By applying for a loan with Martian Bank, you
                          acknowledge that you have read, understood, and agreed
                          to these Terms and Conditions. If you have any
                          questions or concerns, please contact our customer
                          support team.
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
                    Apply
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
            style={{ fontSize: "2.25vh" }}
            className="bg-dark text-white text-center"
          >
            Loans For You
          </Card.Header>
        </Card>

        <Form.Select
          style={{ marginTop: "2vh" }}
          value={selectedAccount ? selectedAccount : "Select Account"}
          multiple={false}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="py-2 px-2 text-center"
        >
          <option value="Select Account">Select Account</option>
          {allAccounts.map((account) => (
            <option key={account.accountNumber} value={account.accountNumber}>
              {account.accountNumber}
            </option>
          ))}
        </Form.Select>
        <CustomCard
          title="Base Camp"
          text={
            <>
              Interest Rate: 5.99%, Time Period: 10 years <br />
              <Badge
                bg="success"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                }}
              >
                Eligible
              </Badge>
            </>
          }
        />
        <CustomCard
          title="Rover"
          text={
            <>
              Interest Rate: 6.5%, Time Period: 5 years <br />
              <Badge
                bg="success"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                }}
              >
                Eligible
              </Badge>
            </>
          }
        />

        <Card style={{ marginTop: "5vh" }}>
          <Card.Header
            style={{ fontSize: "2.25vh" }}
            className="bg-dark text-white text-center"
          >
            Approved Loans
          </Card.Header>
        </Card>
        {loanInfo && loanInfo.loans ? (
          loanInfo.loans.length > 0 ? (
            loanInfo.loans.map((loan) => (
              <CustomCard
                title={`${loan.loanType} Loan for $${loan.loanAmount}`}
                text={
                  <>
                    Interest Rate: {loan.interestRate}%, Time Period:
                    {loan.timePeriod} years <br />
                    Account: {loan.accountNumber}
                  </>
                }
              />
            ))
          ) : (
            <h3 className="mt-5" style={{ textAlign: "center" }}>
              No loans to show
            </h3>
          )
        ) : (
          <h3 className="mt-5" style={{ textAlign: "center" }}>
            No loans to show
          </h3>
        )}
      </Col>
    </Row>
  );
};

export default LoanScreen;
