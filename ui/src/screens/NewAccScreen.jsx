import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const NewAccScreen = () => {

  const [address, setAddress] = useState('');
  const [govtId, setGovtId] = useState([]);
  const [govtIdNo, setGovtIdNo] = useState('');
  const [accType, setAccType] = useState([]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (userInfo) {
    //   navigate('/');
    // }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await login({ email, password }).unwrap();
    //   dispatch(setCredentials({ ...res }));
    //   toast.success('Successfully logged in!')
    //   navigate('/');
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return (
    <FormContainer>
      <h2 className='bg-dark mx-3 text-white' style={{textAlign:'center', paddingTop: '1.5vh', paddingBottom: '1.5vh'}}>
        <strong>NEW &nbsp; ACCOUNT</strong>
      </h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-4' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your residential address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-4' controlId='govt_id'>
          <Form.Label>Govt. ID</Form.Label>
          <Form.Select
            value={govtId}
            onChange={(e) => setGovtId(e.target.value)}
            aria-label="Select your govt. ID"
          >
            <option value="">Select your govt. ID</option>
            <option value="passport">Passport</option>
            <option value="driverLicense">Driver's License</option>
            <option value="aadharCard">SSN</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='my-4' controlId='govt_id_no'>
          <Form.Label>Govt. ID number</Form.Label>
          <Form.Control
            type='number'
            min='0'
            isInvalid={govtIdNo < 0}
            onWheel={(e) => e.target.blur()}
            placeholder='Enter your Govt. ID number'
            value={govtIdNo}
            onChange={(e) => setGovtIdNo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-4' controlId='acc_type'>
          <Form.Label>Account type</Form.Label>
          <Form.Select
            value={accType}
            onChange={(e) => setAccType(e.target.value)}
            aria-label="Select account type"
          >
            <option value="">Select your account type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
        </Form.Select>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='dark'
          className='mt-3'
        >
          Create Account
        </Button>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default NewAccScreen;
