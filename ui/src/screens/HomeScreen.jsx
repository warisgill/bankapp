import { useSelector } from "react-redux";
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

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const renderDashboard = () => {
    return (
      <Container fluid style={{ overflowY: "auto" }}>
        <Row>
          <Col md={8} style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header
                style={{ fontSize: "3vh" }}
                className="bg-dark text-white"
              >
                <strong>Bank accounts</strong>
              </Card.Header>
            </Card>
            <Card style={{ marginTop: "2vh" }}>
              <Card.Header className="bg-light text-uppercase">
                <strong>
                  Checking Account
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ marginLeft: "1rem" }}
                  />
                </strong>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col md={5}>
                      <div>
                        <strong style={{ fontSize: "5vh" }}>$ 1,217.53</strong>
                      </div>
                      <div>Available balance</div>
                    </Col>
                    <Col md={1} />
                    <Col md={6}>
                      <div style={{ fontSize: "1.5vh", marginTop: "1vh" }}>
                        Account Number:{" "}
                        <span className="text-primary">12345678987654321</span>{" "}
                        <br />
                      </div>
                      <div style={{ fontSize: "1.5vh" }}>
                        Deposits this month: <strong>+ $100</strong> <br />
                        Withdrawls this month: <strong>- $200</strong>
                      </div>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to="/acc-info" style={{ textDecoration: "none" }}>
                  <Button variant="dark" className="float-end">
                    Account info
                  </Button>
                </Link>
                <Link to="/transfer" style={{ textDecoration: "none" }}>
                  <Button variant="dark" className="float-end me-2">
                    Transfer money
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
            <Card style={{ marginTop: "2vh" }}>
              <Card.Header className="bg-light text-uppercase">
                <strong>
                  Savings Account
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ marginLeft: "1rem" }}
                  />
                </strong>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>
                    <strong style={{ fontSize: "5vh" }}>$ 1,217.53</strong>
                  </div>
                  <div>Available balance</div>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="dark" className="float-end">
                  Account info
                </Button>
                <Button variant="dark" className="float-end me-2">
                  Transfer money
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={1}></Col>
          <Col md={3}>
            <Link to="/new-account" style={{ textDecoration: "none" }}>
              <Card className="custom-card" style={{ marginTop: "6vh" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5vh" }}>
                    <strong>New Account</strong>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.5vh" }}>
                    Create a new checking or savings account with Cisco Bank.
                  </Card.Text>
                </Card.Body>
                <Badge
                  circle
                  bg="dark"
                  className="position-absolute top-0 end-0"
                  style={{
                    transform: "translate(-20%, -50%)",
                    height: "5vh",
                    width: "5vw",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                    className="p-2"
                    style={{
                      fontSize: "24px",
                      color: "white",
                    }}
                  />
                </Badge>
              </Card>
            </Link>
            <Link to="/transfer" style={{ textDecoration: "none" }}>
              <Card className="custom-card" style={{ marginTop: "6vh" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5vh" }}>
                    <strong>Transfer</strong>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.5vh" }}>
                    Make a payment to an external or internal bank account.
                  </Card.Text>
                </Card.Body>
                <Badge
                  circle
                  bg="dark"
                  className="position-absolute top-0 end-0"
                  style={{
                    transform: "translate(-20%, -50%)",
                    height: "5vh",
                    width: "5vw",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="p-2"
                    style={{
                      fontSize: "24px",
                      color: "white",
                    }}
                  />
                </Badge>
              </Card>
            </Link>
            <Card className="custom-card" style={{ marginTop: "6vh" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vh" }}>
                  <strong>Transactions</strong>
                </Card.Title>
                <Card.Text style={{ fontSize: "1.5vh" }}>
                  Check all your pending and completed transactions here.
                </Card.Text>
              </Card.Body>
              <Badge
                circle
                bg="dark"
                className="position-absolute top-0 end-0"
                style={{
                  transform: "translate(-20%, -50%)",
                  height: "5vh",
                  width: "5vw",
                }}
              >
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
                  className="p-2"
                  style={{
                    fontSize: "24px",
                    color: "white",
                  }}
                />
              </Badge>
            </Card>
            <Card className="custom-card" style={{ marginTop: "6vh" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "2.5vh" }}>
                  <strong>Loan</strong>
                </Card.Title>
                <Card.Text style={{ fontSize: "1.5vh" }}>
                  Apply for a loan at the best interest rates in the market.
                </Card.Text>
              </Card.Body>
              <Badge
                circle
                bg="dark"
                className="position-absolute top-0 end-0"
                style={{
                  transform: "translate(-20%, -50%)",
                  height: "5vh",
                  width: "5vw",
                }}
              >
                <FontAwesomeIcon
                  icon={faLandmarkFlag}
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
          </Col>
        </Row>
      </Container>
    );
  };

  return userInfo ? renderDashboard() : <Hero />;
};

export default HomeScreen;
