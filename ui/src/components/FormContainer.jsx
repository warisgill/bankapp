import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children, position }) => {
  return (
    <Container>
      {position === "left" ? (
        <Row className="justify-content-md-left card" style={{margin: '5vh'}}>
          <Col xs={12} md={5} className=" border p-5">
            {children}
          </Col>
          {/* <Col xs={12} md={5} className="p-5" style={{  padding: "10vh" }}>
            <img
              src="./src/assets/card.png"
              alt="card"
              width="100%"
              style={{ height: "65vh", backgroundColor: "transparent" }}
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
