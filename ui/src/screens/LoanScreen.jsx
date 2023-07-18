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
  const [loanAdded, setLoanAdded] = useState(false);

  const loanInfo = useSelector((state) => state.loan.loan_history).response;
  let allAccounts = useSelector((state) => state.account.all_accounts).response;
  if (!allAccounts) {
    allAccounts = [];
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const fetchLoans = async () => {
    const data = new FormData();
    data.append("email", userInfo.email);
    const res = await loanHistoryAPI(data).unwrap();
    console.log(res);
    dispatch(storeLoanHistory(res));
  };

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
      <Col md={4} className="mt-5">
        {/* <div
          style={{
            fontSize: "2.5vh",
            backgroundColor: "#e9ecef",
            marginBottom: "3vh",
          }}
          className="card text-center p-3"
        >
          Available Loans
        </div> */}
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
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Button
              style={{ width: "100%" }}
              variant="dark"
              className="mt-5"
              onClick={() => navigate("/new-loan")}
            >
              Apply here!
            </Button>
          </Col>
          <Col md={3} />
        </Row>
      </Col>

      <Col md={1} />

      <Col md={6} className="mt-5">
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
            <Loader />
          )
        ) : (
          <div>
            <div
              style={{
                fontSize: "2.5vh",
                backgroundColor: "#e9ecef",
                marginBottom: "3vh",
              }}
              className="card text-center p-3"
            >
              Your Loans
            </div>
            <h3 className="mt-5" style={{ textAlign: "center" }}>
              You dont have any approved loans
            </h3>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default LoanScreen;
