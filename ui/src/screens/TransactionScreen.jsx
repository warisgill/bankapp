import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';

const TransactionScreen = () => {

  return (
    <Container fluid style={{ overflowY: 'auto', marginTop: '10vh' }}>
    <MDBTable align='middle' striped hover>
      <MDBTableHead dark>
        <tr className='text-center text-uppercase' style={{fontSize: '2.5vh'}}>
          <th scope='col' className='bg-dark text-white' style={{ padding: '2vh' }}>
            <strong>Name</strong>
          </th>
          <th scope='col' className='bg-dark text-white' style={{ padding: '2vh' }}>
            <strong>Account Details</strong>
          </th>
          <th scope='col' className='bg-dark text-white' style={{ padding: '2vh' }}>
            <strong>Amount</strong>
          </th>
          <th scope='col' className='bg-dark text-white' style={{ padding: '2vh' }}>
            <strong>Your Account</strong>
          </th>
          <th scope='col' className='bg-dark text-white' style={{ padding: '2vh' }}>
            <strong>Type</strong>
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='danger' pill>
              Debit
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='success' pill>
              Credit
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='danger' pill>
              Debit
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='success' pill>
              Credit
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='danger' pill>
              Debit
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td className='text-center'>
            <div>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <p className='fw-normal mb-1'>12345678987654321</p>
            <p className='text-muted mb-0'>Checking Account</p>
          </td>
          <td className='text-center fw-bold'>
            $ 125.72
          </td>
          <td className='text-center'> 
          <p className='fw-normal mb-1'>98765432123456789</p>
            <p className='text-muted mb-0'>Savings Account</p>
          </td>
          <td className='text-center'>
            <MDBBadge color='success' pill>
              Credit
            </MDBBadge>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
    </Container>
  );
}

export default TransactionScreen;