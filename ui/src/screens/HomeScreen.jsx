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
    console.log(res);
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
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container fluid style={{ flex: 1, overflowY: "auto" }}>
          <Row>
            <Col md={2} />
            <Col md={8} style={{ marginTop: "5vh" }}>
              {accountInfo ? (
                accountInfo.length > 0 ? (
                  accountInfo.map((account) => {
                    return (
                      <Link
                        to="/acc-info"
                        style={{ textDecoration: "none" }}
                        onClick={() => dispatch(currentAccount(account))}
                      >
                        <Card
                          style={{
                            marginTop: "2vh",
                          }}
                        >
                          <Card.Header className="bg-dark text-uppercase text-white">
                            {account.account_type} Account
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
                                    <strong style={{ fontSize: "3vh" }}>
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
                                    style={{
                                      fontSize: "1.25vh",
                                      marginTop: "1vh",
                                    }}
                                  >
                                    Account Number:
                                    <span className="text-primary">
                                      <span>&nbsp;</span>
                                      <strong>
                                        ...{account.account_number.slice(-4)}
                                      </strong>
                                    </span>
                                    <br />
                                    <div
                                      style={{ fontSize: "1.25vh" }}
                                      className="text-muted"
                                    >
                                      Name: {account.name} <br />
                                      Email ID: {account.email_id}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <Link
                              to="/transfer"
                              style={{ textDecoration: "none" }}
                              onClick={() => dispatch(selectedAccount(account))}
                            >
                              <Button
                                variant="dark"
                                className="float-end me-2"
                                size="sm"
                              >
                                Transfer money
                              </Button>
                            </Link>
                          </Card.Footer>
                        </Card>
                      </Link>
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
            <Col md={2} />
          </Row>
        </Container>
        <div style={{ flexShrink: "0", marginBottom: "12vh", width:"100%"}}>
          <Row style={{ marginTop: "2vh", width:"100%" }}>
            <Col md={2} />
            <Col md={8}>
              <Card
                style={{
                  marginTop: "1.5vh",
                }}
              >
                <Card.Body>
                  <Card.Text style={{ fontSize: "1vh" }}>
                    <Card.Body className="text-muted">
                      <span>
                        <strong>Account Disclosures</strong>
                      </span>
                      <br />
                      <br />
                      {/* <span>Investment and Insurance Products are:</span>
                    <br />
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
                    </ul> */}
                      <span>
                        Investment products and services are offered through
                        Martian Bank Advisors. Martian Bank Advisors is a trade
                        name used by Martian Clearing Services, LLC (MCSC) and
                        Martian Bank Advisors Financial Network, LLC, Members
                        MPIC (Martian Planetary Investment Commission), separate
                        registered broker-dealers and non-bank affiliates of
                        Martian Bank Corporation.
                      </span>
                      <br />
                      <span>
                        Deposit products offered by Martian Bank, M.A. Member
                        MFDIC (Martian Financial Deposit Insurance Corporation).
                      </span>
                      <br />
                      <span>Equal Planetary Habitat Lender</span>
                      <br />
                      <span>
                        MFICO is a registered trademark of Martian Isaac
                        Corporation in Mars and other celestial bodies.
                      </span>
                    </Card.Body>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return userInfo ? renderDashboard() : <Hero />;
};

export default HomeScreen;
