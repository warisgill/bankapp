import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'><span style={{fontSize: '6vh', fontWeight: 'bold'}}>Welcome to Cisco Bank</span></h1>
          <div className='d-flex mt-4 mb-4'>
            <Button variant='dark' href='/login' className='me-5 px-5 py-2'>
              <span style={{fontSize: '2.4vh'}}>My Account</span>
            </Button>
            <Button variant='dark' href='/register' className='me-5 px-5 py-2'>
            <span style={{fontSize: '2.4vh'}}>Create Account</span>
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
