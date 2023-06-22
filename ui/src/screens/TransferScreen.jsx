import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { usePostTransferMutation } from "../slices/transferApiSlice";
import { createTransfer } from "../slices/transferSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const TransferScreen = () => {
  const [accType, setAccType] = useState("Checking");
  const [accNo, setAccNo] = useState("");
  const [receiverAcc, setReceiverAcc] = useState("");
  const [receiverAccNo, setReceiverAccNo] = useState("");
  const [accBalance, setAccBalance] = useState("$ 1,217.53");
  const [transferAmount, setTransferAmount] = useState("");
  const [reason, setReason] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postTransfer, { isLoading }] = usePostTransferMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("sender_account_number", accNo);
      data.append("receiver_account_number", receiverAccNo);
      data.append("sender_account_type", accType);
      data.append("receiver_account_type", receiverAcc);
      data.append("reason", reason);
      data.append("amount", transferAmount);

      console.log(data)
      const res = await postTransfer(data).unwrap();
      console.log("Transfer response: ", res)
      dispatch(createTransfer({ ...res }));
      toast.success("Transfer successful!");
      navigate("/");
    } catch (err) {
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
          <Col md={3}>
            <DropdownButton
              id="acc_type"
              className="mt-5"
              variant="dark"
              title={accType ? accType : "Checking"}
              onSelect={(option) => setAccType(option)}
              style={{ width: "100%" }}
            >
              <Dropdown.Item eventKey="*required">
                Your account type
              </Dropdown.Item>
              <Dropdown.Item eventKey="savings">Savings</Dropdown.Item>
              <Dropdown.Item eventKey="checking">Checking</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={9}>
            <Form.Group className="mt-3" controlId="acc_no">
              <Form.Label>Your account number</Form.Label>
              <Form.Control
                type="text"
                min="0"
                onChange={(e) => setAccNo(e.target.value)}
                placeholder="Enter your account number"
                value={accNo}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <DropdownButton
              id="receiver_acc_type"
              className="mt-5"
              variant="dark"
              title={receiverAcc ? receiverAcc : "Checking"}
              onChange={(e) => setReceiverAcc(e.target.value)}
              style={{ width: "100%" }}
            >
              <Dropdown.Item value="">Receiver's account type</Dropdown.Item>
              <Dropdown.Item value="savings">Savings</Dropdown.Item>
              <Dropdown.Item value="checking">Checking</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={9}>
            <Form.Group className="mt-3" controlId="receiver_acc_no">
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

        <Row className="mt-4">
          {/* <Col md={3}>
            <Form.Group className="my-3" controlId="balance">
              <Form.Label>Your balance</Form.Label>
              <Form.Control value={accBalance} multiple={false} disabled />
            </Form.Group>
          </Col> */}
          <Col md={12}>
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
              onChange={(e) => setReason(e.target.value)}
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
