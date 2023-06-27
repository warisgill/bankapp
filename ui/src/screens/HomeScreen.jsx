import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBuildingColumns,
  faMoneyBillTransfer,
  faCreditCard,
  faLandmarkFlag,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useGetAllAccountsMutation } from "../slices/accountApiSlice";
import {
  getAccounts,
  selectedAccount,
  currentAccount,
} from "../slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const CustomCard = ({ title, text, icon, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        className="custom-card"
        style={{
          marginTop: "6vh",
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
        <Badge
          circle="true"
          bg="dark"
          className="position-absolute top-0 end-0"
          style={{
            transform: "translate(-20%, -50%)",
            height: "5vh",
            width: "5vw",
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            className="p-2"
            style={{
              fontSize: "24px",
              color: "white",
            }}
          />
        </Badge>
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
    </Link>
  );
};

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const accountInfo = useSelector(
    (state) => state.account.all_accounts
  ).response;

  const dispatch = useDispatch();

  const [getAllAccounts, { isLoading }] = useGetAllAccountsMutation();

  const fetchAccounts = async () => {
    const data = new FormData();
    data.append("email_id", userInfo.email);
    const res = await getAllAccounts(data).unwrap();
    dispatch(getAccounts(res));
  };

  useEffect(() => {
    try {
      dispatch(selectedAccount());
      dispatch(currentAccount());
      fetchAccounts();
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching accounts!");
    }
  }, []);

  const renderDashboard = () => {
    return (
      <Container fluid style={{ overflowY: "auto" }}>
        <Row>
          <Col md={3}>
            {/* New Account Card */}
            <CustomCard
              link="/new-account"
              title="New Account"
              text="Create a new checking or savings account with Cisco Bank."
              icon={faBuildingColumns}
            />

            {/* Transfer Card */}
            <CustomCard
              link="/transfer"
              title="Transfer"
              text="Make a payment to an external or internal bank account."
              icon={faCreditCard}
            />

            {/* Transactions Card */}
            <CustomCard
              link="/transactions"
              title="Transactions"
              text="Check all your pending and completed transactions here."
              icon={faMoneyBillTransfer}
            />

            {/* Loan Card */}
            <CustomCard
              link="/loan"
              title="Loan"
              text="Apply for a loan at the best interest rates in the market."
              icon={faLandmarkFlag}
            />
          </Col>

          <Col md={1} />

          <Col md={8} style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header
                style={{ fontSize: "3vh" }}
                className="bg-dark text-white"
              >
                <strong>Bank accounts</strong>
              </Card.Header>
            </Card>
            {accountInfo ? (
              accountInfo.length > 0 ? (
                accountInfo.map((account) => {
                  return (
                    <Card
                      style={{
                        marginTop: "2vh",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "invert(2%)",
                      }}
                    >
                      <Card.Header className="bg-dark text-uppercase text-white">
                        <strong>
                          {account.accountType} Account
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            style={{ marginLeft: "1rem" }}
                          />
                        </strong>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Row>
                            <Col md={5} className="text-center">
                              <div>
                                <strong style={{ fontSize: "5vh" }}>
                                  ${account.balance}
                                </strong>
                              </div>
                              <div className="text-muted">
                                Available balance
                              </div>
                            </Col>
                            <Col md={1} />
                            <Col md={6}>
                              <div
                                style={{ fontSize: "1.5vh", marginTop: "1vh" }}
                              >
                                Account Number:
                                <span className="text-primary">
                                  <span>&nbsp;</span>
                                  <strong>{account.accountNumber}</strong>
                                </span>
                                <br />
                                <div
                                  style={{ fontSize: "1.5vh" }}
                                  className="text-muted"
                                >
                                  Name: {account.name} <br />
                                  Email ID: {account.emailId}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Link
                          to="/acc-info"
                          style={{ textDecoration: "none" }}
                          onClick={() => dispatch(currentAccount(account))}
                        >
                          <Button variant="dark" className="float-end">
                            Account info
                          </Button>
                        </Link>
                        <Link
                          to="/transfer"
                          style={{ textDecoration: "none" }}
                          onClick={() => dispatch(selectedAccount(account))}
                        >
                          <Button variant="dark" className="float-end me-2">
                            Transfer money
                          </Button>
                        </Link>
                      </Card.Footer>
                    </Card>
                  );
                })
              ) : (
                <>
                  <Card
                    style={{
                      marginTop: "2vh",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "invert(2%)",
                    }}
                  >
                    <Card.Header className="bg-dark text-uppercase text-white">
                      <strong>No Accounts Found</strong>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Would you like to create a new account with us?
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        to="/new-account"
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="dark" className="float-end">
                          Create Account
                        </Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </>
              )
            ) : (
              <Loader />
            )}
          </Col>
        </Row>
      </Container>
    );
  };

  return userInfo ? renderDashboard() : <Hero />;
};

export default HomeScreen;
