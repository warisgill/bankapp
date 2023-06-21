import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { useCreateAccountMutation } from "../slices/accountApiSlice";
import { createAccount } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const TransferScreen = () => {
  const [accType, setAccType] = useState('Checking');
  const [accNo, setAccNo] = useState('12345678987654321');
  const [receiverAcc, setReceiverAcc] = useState('');
  const [receiverAccNo, setReceiverAccNo] = useState('');
  const [accBalance, setAccBalance] = useState('$ 1,217.53');
  const [transferAmount, setTransferAmount] = useState('');
  const [reason, setReason] = useState('');

  const navigate = useNavigate();

  const [createNewAccount, { isLoading }] = useCreateAccountMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try{

      const data = new FormData();
      data.append("name", userInfo.name);
      data.append("email_id", userInfo.email);
      data.append("address", address);
      data.append("government_id_type", govtId);
      data.append("govt_id_number", govtIdNo);
      data.append("account_type", accType);

      // const data = {
      //   "name": userInfo.name,
      //   "email_id": userInfo.email,
      //   "address": address,
      //   "government_id_type": govtId,
      //   "govt_id_number": govtIdNo,
      //   "account_type": accType
      // }

      // console.log(data)

      // fetch('http://127.0.0.1:5000/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   body: data,
      // })
      // .then(response => response.json())
      // .then(data => console.log(data));
      
      const res = await createNewAccount(data).unwrap();
      console.log(res);
      dispatch(createAccount({ ...res }));
      toast.success('Successfully created a new account!')
      navigate('/');
    }
    catch(err){
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h2
        className="bg-dark mx-3 text-white"
        style={{
          textAlign: "center",
          paddingTop: "1.5vh",
          paddingBottom: "1.5vh",
        }}
      >
        <strong>TRANSFER &nbsp; MONEY</strong>
      </h2>

      <Form onSubmit={submitHandler}>
        
        <Row className="mt-4">
            <Col md={4}>
                <Form.Group className="my-3" controlId="acc_type">
                    <Form.Label>Your account</Form.Label>
                    <Form.Control
                    value={accType}
                    multiple={false}
                    disabled
                    >
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={8}>
                <Form.Group className="my-3" controlId="acc_no">
                    <Form.Label>Your account number</Form.Label>
                    <Form.Control
                        type="text"
                        min="0"
                        placeholder="Enter your account number"
                        value={accNo}
                        disabled
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
                <Form.Group className="my-3" controlId="receiver_acc_type">
                    <Form.Label>Receiver's account</Form.Label>
                    <Form.Select
                    value={receiverAcc}
                    multiple={false}
                    onChange={(e) => setReceiverAcc(e.target.value)}
                    aria-label="Select account type"
                    >
                    <option value="">Account type</option>
                    <option value="savings">Savings</option>
                    <option value="checking">Checking</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={8}>
                <Form.Group className="my-3" controlId="receiver_acc_no">
                    <Form.Label>Receiver's account number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter receiver's account number"
                        value={receiverAccNo}
                        onChange={(e) => setReceiverAccNo(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col md={4}>
                <Form.Group className="my-3" controlId="balance">
                    <Form.Label>Your balance</Form.Label>
                    <Form.Control
                        value={accBalance}
                        multiple={false}
                        disabled
                    />
                </Form.Group>
            </Col>
            <Col md={8}>
                <Form.Group className="my-3" controlId="transfer_amount">
                    <Form.Label>Amount to be transfered</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        placeholder="Enter amount to be transfered"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
          <Form.Group className="my-3" controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the reason for transfer (Optional)"
              value={reason}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row>
            <Button
            disabled={isLoading}
            style={{ width: "100%" }}
            type="submit"
            variant="dark"
            className="mt-4 mr-3"
            >
              Make Payment
            </Button>
        </Row>
        
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default TransferScreen;
