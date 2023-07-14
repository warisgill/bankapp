import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetTransactionsMutation } from "../slices/transactionApiSlice";
import { storeTransaction } from "../slices/transactionSlice";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../index.css";

const TransactionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let allAccountsRedux = useSelector(
    (state) => state.account.all_accounts
  ).response;

  if (!allAccountsRedux) {
    allAccountsRedux = [];
  }
  const [allAccounts, setAllAccounts] = useState(allAccountsRedux);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [history, setHistory] = useState([]);

  const [getTransactions, { isLoading }] = useGetTransactionsMutation();
  // const [getAllAccounts, { isLoading1 }] = useGetAllAccountsMutation();

  const fetchHistory = async (e) => {
    setSelectedAccount(e.target.value);
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("account_number", selectedAccount);
      const res = await getTransactions(data).unwrap();
      dispatch(storeTransaction(res));
      setHistory(res.response.transactions);
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
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
  };

  return (
    <Container fluid style={{ overflowY: "auto", marginTop: "10vh" }}>
      <Form>
        <Form.Group as={Row}>
          <Col md={3} />
          <Col md={4}>
            <Form.Select
              value={selectedAccount ? selectedAccount : "Select Account"}
              multiple={false}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="py-3 px-2 text-center"
            >
              <option value="Select Account">Select Account</option>
              {allAccounts.map((account) => (
                <option
                  key={account.accountNumber}
                  value={account.accountNumber}
                >
                  {account.accountNumber}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              variant="dark"
              type="submit"
              className="w-100 me-3 px-5 py-2"
              onClick={fetchHistory}
            >
              <span style={{ fontSize: "2vh" }}>Search</span>
            </Button>
          </Col>
          <Col md={3} />
        </Form.Group>
      </Form>
      <MDBTable align="middle" striped hover style={{ marginTop: "4vh" }}>
        <MDBTableHead dark>
          <tr
            className="text-center text-uppercase"
            style={{ fontSize: "2vh" }}
          >
            <th
              scope="col"
              className="bg-dark text-white"
              style={{ padding: "2vh" }}
            >
              Sender
            </th>
            <th
              scope="col"
              className="bg-dark text-white"
              style={{ padding: "2vh" }}
            >
              Amount
            </th>
            <th
              scope="col"
              className="bg-dark text-white"
              style={{ padding: "2vh" }}
            >
              Details
            </th>
            <th
              scope="col"
              className="bg-dark text-white"
              style={{ padding: "2vh" }}
            >
              Type
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {console.log(history)}
          {history.length > 0 && history ? (
            history.map((transaction) => (
              <tr key={transaction.id}>
                <td className="text-center fw-normal">
                  {transaction.accountNumber}
                </td>
                <td className="text-center fw-bold">$ {transaction.amount}</td>
                <td className="text-center">
                  <p className="fw-normal mb-1">
                    {transaction.timeStamp.substring(0, 10)}
                  </p>
                  <p className="text-muted mb-0">{transaction.reason}</p>
                </td>
                <td className="text-center">
                  <MDBBadge
                    color={transaction.type === "debit" ? "danger" : "success"}
                    pill
                  >
                    {transaction.type}
                  </MDBBadge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </Container>
  );
};

export default TransactionScreen;
