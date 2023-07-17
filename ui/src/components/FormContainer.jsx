import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children, position }) => {
  return (
    <Container>
      {position === "left" ? (
        <Row className="justify-content-md-left mt-5 pt-3">
          <Col xs={12} md={5} className="card p-5">
            {children}
          </Col>
          {/* <Col xs={12} md={7} className="card p-5" style={{ backgroundColor: "transparent", padding: "10vh" }}>
            <img
              src="./src/assets/card.png"
              alt="card"
              width="100%"
              style={{ height: "45vh", backgroundColor: "transparent" }}
            />
          </Col> */}
        </Row>
      ) : (
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5">
            {children}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FormContainer;
