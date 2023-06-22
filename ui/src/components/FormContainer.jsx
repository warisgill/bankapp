import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5' style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'invert(2%)' }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
