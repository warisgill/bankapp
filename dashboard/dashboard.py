import os
import logging
import json
from google.protobuf.json_format import MessageToDict
from flask_cors import CORS

from flask import Flask, render_template, request, jsonify
import grpc
from dataclasses import dataclass

from accounts_pb2 import * 
from accounts_pb2_grpc import *

from transaction_pb2_grpc import *
from transaction_pb2 import * 

from loan_pb2_grpc import LoanServiceStub
from loan_pb2 import * 

from pymongo.mongo_client import MongoClient

# set logging to debug
logging.basicConfig(level=logging.DEBUG)


uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
db_host = os.getenv("DATABASE_HOST", "localhost")
# uri = f"mongodb://root:example@{db_host}:27017/"
client = MongoClient(uri)
db = client['bank']
collection = db['accounts']






app = Flask(__name__)
CORS(app)



@app.route("/")
def render_homepage():
    return f"Dashboard is running..."




# @app.route("/")
# def render_homepage():
#     account_details_host = os.getenv("ACCOUNT_DETAILS_HOST", "localhost")
#     account_details_channel = grpc.insecure_channel(f"{account_details_host}:50051")
#     account_details_client = AccountDetailsServiceStub(account_details_channel)

#     account_details_request = GetAccountDetailsRequest(account_number="1")
#     account_details_response = account_details_client.GetAccountDetails(
#         account_details_request
#     )
#     return render_template(
#         "homepage.html", account=account_details_response.account
#     )

# gRPC setup


# @app.route('/detail', methods=['GET', 'POST'])
# def account_details():
#     channel = grpc.insecure_channel('localhost:50051')
#     client = AccountDetailsServiceStub(channel)
#     if request.method == 'POST':
#         account_number = request.form['account_number']

#         # Create a gRPC request
#         account_request = GetAccountDetailsRequest(account_number=account_number)

#         # Send the gRPC request to the Account Details Microservice
#         response = client.getAccountDetails(account_request)

#         return render_template('detail_result.html', response=response)

#     return render_template('detail_form.html')




@app.route('/account/create', methods=['GET', 'POST'])
def create_account():
    accounts_host = os.getenv("ACCOUNT_HOST", "localhost")
    logging.debug(f"host account {accounts_host}")
    channel = grpc.insecure_channel(f'{accounts_host}:50051')
    client = AccountDetailsServiceStub(channel)
    if request.method == 'POST':
        logging.debug("+++++++++++++++++++++++++++++++++++++++++")
        logging.debug(request.form)

        email_id = request.form['email_id']
        account_type = request.form['account_type']
        address = request.form['address']
        govt_id_number = request.form['govt_id_number']
        government_id_type = request.form['government_id_type']
        name = request.form['name']

        
        # Create a gRPC request
        account_request = CreateAccountRequest(
            email_id=email_id,
            account_type=account_type,
            address=address,
            govt_id_number=govt_id_number,
            government_id_type=government_id_type,
            name=name
        )

        logging.debug(f"Sending account creation request: {account_request}")
        # Send the gRPC request to the Account Microservice
        response = client.createAccount(account_request)
        logging.debug(f"Account creation response: {response}")

        logging.debug(f"Account creation response: {response.result}")
        


            # Return a JSON response
        return jsonify({
                'success': response.result,
                'message': 'Account created successfully',
                'data': {
                    'response': response.result
                }
            })
    return render_template('create_account_form.html')


@app.route('/account/allaccounts', methods=['GET', 'POST'])
def get_all_accounts():
    accounts_host = os.getenv("ACCOUNT_HOST", "localhost")
    channel = grpc.insecure_channel(f'{accounts_host}:50051')
    client = AccountDetailsServiceStub(channel)
    if request.method == 'POST':
        logging.debug("+++++++++++++++++++++++++++++++++++++++++")
        logging.debug(request.form)

        email_id = request.form['email_id']

        get_req = GetAccountsRequest(email_id=email_id)
        response = client.getAccounts(get_req)
    
        return json.dumps({"response":[MessageToDict(acc) for acc in response.accounts]}) #response
    return jsonify({"response": None})


@app.route('/transaction', methods=['GET', 'POST'])
def transaction_form():
    transaction_host = os.getenv("TRANSACTION_HOST", "localhost")
    channel = grpc.insecure_channel(f'{transaction_host}:50052')
    client = TransactionServiceStub(channel)

    if request.method == 'POST':
        sender_account_number = request.form['sender_account_number'] # type: ignore
        receiver_account_number = request.form['receiver_account_number'] # type: ignore
        amount = float(request.form['amount']) # type: ignore
        sender_account_type = request.form['sender_account_type'] # type: ignore
        receiver_account_type = request.form['receiver_account_type'] # type: ignore
        reason = request.form['reason'] # type: ignore
        req = TransactionRequest(
            sender_account_number=sender_account_number,
            receiver_account_number=receiver_account_number,
            amount=amount,
            sender_account_type=sender_account_type,
            receiver_account_type=receiver_account_type,
            reason=reason
        )

        logging.debug("Sending transaction request...")

        response = client.SendMoney(req)

        # return f"Transaction successful. Transaction ID: {response}"
        return json.dumps({"response": MessageToDict(response)})
    
    return render_template('transaction.html')

@app.route('/transaction/zelle/', methods=['GET', 'POST'])
def transaction_zelle():
    transaction_host = os.getenv("TRANSACTION_HOST", "localhost")
    channel = grpc.insecure_channel(f'{transaction_host}:50052')
    client = TransactionServiceStub(channel)

    if request.method == 'POST':
        sender_email = request.form['sender_email'] # type: ignore
        receiver_email = request.form['receiver_email'] # type: ignore
        amount = float(request.form['amount']) # type: ignore
        reason = request.form['reason'] # type: ignore

        req = ZelleRequest(sender_email=sender_email, receiver_email=receiver_email, amount=amount, reason=reason)

 
        logging.debug("Sending transaction request...")

        response = client.Zelle(req)

        logging.debug(f"Zelle response: {response}")

        # return f"Transaction successful. Transaction ID: {response}"
        return json.dumps({"response": MessageToDict(response), "test": "working"})
    
    return render_template('transaction.html')


@app.route('/transaction/history', methods=['GET', 'POST'])
def get_all_transactions():
    if request.method == 'POST':
        account_number = request.form['account_number'] # type: ignore
        
        transaction_host = os.getenv("TRANSACTION_HOST", "localhost")
        channel = grpc.insecure_channel(f'{transaction_host}:50052')
        # channel = grpc.insecure_channel('localhost:50052')
        client = TransactionServiceStub(channel)

        req = GetALLTransactionsRequest(
            account_number=account_number)

        # logging.debug("Sending transaction request... +++++++++++++++++++++++++++++++")    

        response = client.getTransactionsHistory(req)

        # logging.debug("After transaction request... +++++++++++++++++++++++++++++++")

        # # return f"Transaction successful. Transaction ID: {response}"
        return json.dumps({"response": MessageToDict(response)})
    
    return json.dumps({"response": None})

@app.route('/transaction/transaction-with-id', methods=['GET', 'POST'])
def GetTransactionByID():
    if request.method == 'POST':
        transaction_id = request.form['transaction_id'] # type: ignore
        
        transaction_host = os.getenv("TRANSACTION_HOST", "localhost")
        channel = grpc.insecure_channel(f'{transaction_host}:50052')
        # channel = grpc.insecure_channel('localhost:50052')
        client = TransactionServiceStub(channel)

        req = TransactionByIDRequest(
            transaction_id=transaction_id)

        # logging.debug("Sending transaction request... +++++++++++++++++++++++++++++++")    

        response = client.getTransactionByID(req)

        # logging.debug("After transaction request... +++++++++++++++++++++++++++++++")

        # # return f"Transaction successful. Transaction ID: {response}"
        return json.dumps({"response": MessageToDict(response)})
    
    return json.dumps({"response": None})






@app.route('/loan/', methods=['GET', 'POST'])
def loan_form():
    loan_host = os.getenv("LOAN_HOST", "localhost")
    channel = grpc.insecure_channel(f'{loan_host}:50053')
    client = LoanServiceStub(channel)
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        account_type = request.form['account_type']
        account_number = request.form['account_number']
        govt_id_type = request.form['govt_id_type']
        govt_id_number = request.form['govt_id_number']
        loan_type = request.form['loan_type']
        loan_amount = float(request.form['loan_amount'])
        interest_rate = float(request.form['interest_rate'])
        time_period = request.form['time_period']


        # Create a gRPC request
        loan_request = LoanRequest(name=name, email=email, account_type=account_type, account_number=account_number,  govt_id_type=govt_id_type,  
                                   govt_id_number=govt_id_number, loan_type=loan_type, loan_amount=loan_amount, interest_rate=interest_rate, time_period=time_period)

        # Send the gRPC request to the Loan Microservice
        response = client.ProcessLoanRequest(loan_request)
        # response.account_number = account_number

        logging.debug(f"Loan response: {response.approved}")

        return json.dumps({"response": MessageToDict(response)})

    return render_template('loan_form.html')

@app.route('/loan/history', methods=['GET', 'POST'])
def loan_history():
    # getLoanHistory
    
    loan_host = os.getenv("LOAN_HOST", "localhost")
    channel = grpc.insecure_channel(f'{loan_host}:50053')
    # channel = grpc.insecure_channel('localhost:50053')
    client = LoanServiceStub(channel)
    if request.method == 'POST':
        logging.debug("+++++++++++++++++++++++++++++++++++++++++")
        logging.debug(request.form['email'])
        req =  LoansHistoryRequest(email = request.form['email']) 
        response = client.getLoanHistory(req)
        logging.debug("After transaction request... +++++++++++++++++++++++++++++++")
        return json.dumps({"response": MessageToDict(response)})
    return json.dumps({"response": None})



if __name__ == "__main__":
    app.run(debug=True)
