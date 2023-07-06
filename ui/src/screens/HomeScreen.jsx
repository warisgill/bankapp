import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
import "../index.css";

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

  const renderDashboard = () => {
    return (
      <Container fluid style={{ overflowY: "auto" }}>
        <Row>
          <Col md={7} style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header
                style={{ fontSize: "2.75vh" }}
                className="bg-dark text-white text-center"
              >
                Bank accounts
              </Card.Header>
            </Card>
            {accountInfo ? (
              accountInfo.length > 0 ? (
                accountInfo.map((account) => {
                  return (
                    <Card
                      style={{
                        marginTop: "2vh",
                      }}
                    >
                      <Card.Header className="bg-dark text-uppercase text-white">
                        {account.accountType} Account
                        <FontAwesomeIcon
                          icon={faArrowRightFromBracket}
                          style={{ marginLeft: "1rem" }}
                        />
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Row>
                            <Col md={5} className="text-center">
                              <div>
                                <strong style={{ fontSize: "3.5vh" }}>
                                  ${account.balance.toFixed(2)}
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
                                  <strong>
                                    ...{account.accountNumber.slice(-4)}
                                  </strong>
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
          <Col md={1} />
          <Col md={4} style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header
                style={{ fontSize: "2.75vh" }}
                className="bg-dark text-white text-center"
              >
                Account Disclosures
              </Card.Header>
            </Card>

            <Card
              style={{
                marginTop: "2vh",
              }}
            >
              <Card.Body>
                <Card.Text style={{ fontSize: "1.5vh" }}>
                  <Card.Body>
                    <p>
                      <strong>Account Disclosures</strong>
                    </p>
                    <p>Investment and Insurance Products are:</p>
                    <ul>
                      <li>
                        Not Insured by the MFIC (Martian Financial Institutions
                        Commission) or Any Martian Government Agency
                      </li>
                      <li>
                        Not a Deposit or Other Obligation of, or Guaranteed by,
                        the Bank or Any Bank Affiliate
                      </li>
                      <li>
                        Subject to Investment Risks, Including Possible Loss of
                        the Principal Amount Invested
                      </li>
                    </ul>
                    <p>
                      Investment products and services are offered through
                      Martian Bank Advisors. Martian Bank Advisors is a trade
                      name used by Martian Clearing Services, LLC (MCSC) and
                      Martian Bank Advisors Financial Network, LLC, Members MPIC
                      (Martian Planetary Investment Commission), separate
                      registered broker-dealers and non-bank affiliates of
                      Martian Bank Corporation.
                    </p>
                    <p>
                      Deposit products offered by Martian Bank, M.A. Member
                      MFDIC (Martian Financial Deposit Insurance Corporation).
                    </p>
                    <p>Equal Planetary Habitat Lender</p>
                    <p>
                      MFICO is a registered trademark of Martian Isaac
                      Corporation in Mars and other celestial bodies.
                    </p>
                  </Card.Body>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return userInfo ? renderDashboard() : <Hero />;
};

export default HomeScreen;
