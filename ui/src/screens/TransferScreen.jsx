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
import { deleteSelectedAccount } from "../slices/accountSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const TransferScreen = () => {
  let selectedAccount = useSelector((state) => state.account.selected_account);

  if (!selectedAccount) {
    selectedAccount = {
      accountType: "",
      accountNumber: "",
      balance: 0.00,
    };
  }

  const [accType, setAccType] = useState(selectedAccount.accountType);
  const [accNo, setAccNo] = useState(selectedAccount.accountNumber);
  const [receiverAcc, setReceiverAcc] = useState("");
  const [receiverAccNo, setReceiverAccNo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [reason, setReason] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postTransfer, { isLoading }] = usePostTransferMutation();

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

      const res = await postTransfer(data).unwrap();
      dispatch(createTransfer({ ...res }));
      toast.success("Transfer successful!");
      dispatch(deleteSelectedAccount());
      navigate("/");
    } catch (err) {
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
            <DropdownButton
              id="acc_type"
              className="mt-5"
              variant="dark"
              disabled={accNo ? true : false}
              title={accType ? accType : "Select"}
              onSelect={(option) => setAccType(option)}
              style={{ width: "100%" }}
            >
              <Dropdown.Item eventKey="*required">
                Your account type
              </Dropdown.Item>
              <Dropdown.Item eventKey="Savings">Savings</Dropdown.Item>
              <Dropdown.Item eventKey="Checking">Checking</Dropdown.Item>
              <Dropdown.Item eventKey="Investment">Investment</Dropdown.Item>
              <Dropdown.Item eventKey="Money Market">Money Market</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={8}>
            <Form.Group className="mt-3" controlId="acc_no">
              <Form.Label>Your account number</Form.Label>
              <Form.Control
                type="text"
                min="0"
                onChange={(e) => setAccNo(e.target.value)}
                placeholder="Enter your account number"
                disabled={accNo ? true : false}
                value={accNo ? accNo : ""}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <DropdownButton
              id="receiver_acc_type"
              className="mt-5"
              variant="dark"
              title={receiverAcc ? receiverAcc : "Select"}
              onSelect={(e) => setReceiverAcc(e)}
              style={{ width: "100%" }}
            >
              <Dropdown.Item eventKey="">Receiver's account type</Dropdown.Item>
              <Dropdown.Item eventKey="Savings">Savings</Dropdown.Item>
              <Dropdown.Item eventKey="Checking">Checking</Dropdown.Item>
              <Dropdown.Item eventKey="Investment">Investment</Dropdown.Item>
              <Dropdown.Item eventKey="Money Market">Money Market</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={8}>
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
          {selectedAccount.balance !== "" ? (
            <>
              <Col md={4}>
                <Form.Group className="my-3" controlId="balance">
                  <Form.Label>Your balance</Form.Label>
                  <Form.Control
                    value={`$ ${selectedAccount.balance? selectedAccount.balance.toFixed(2): "0.00"}`}
                    multiple={false}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="my-3" controlId="transfer_amount">
                  <Form.Label>Amount to be transferred</Form.Label>
                  <Form.Control
                    type="text"
                    pattern="^(?!0\d)\d*(\.\d+)?$"
                    placeholder="Enter amount to be transferred (in USD)"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                  />
                </Form.Group>
              </Col>
            </>
          ) : (
            <Col md={12}>
              <Form.Group className="my-3" controlId="transfer_amount">
                <Form.Label>Amount to be transferred</Form.Label>
                <Form.Control
                  type="text"
                  pattern="^(?!0\d)\d*(\.\d+)?$"
                  placeholder="Enter amount to be transferred (in USD)"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
              </Form.Group>
            </Col>
          )}
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
