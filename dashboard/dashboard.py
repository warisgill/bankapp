import os
import json
from google.protobuf.json_format import MessageToDict
from flask_cors import CORS

from flask import Flask, render_template, request, jsonify
import grpc
from dataclasses import dataclass

from account_details_pb2 import * 
from account_details_pb2_grpc import AccountDetailsServiceStub

from transaction_pb2_grpc import TransactionServiceStub
from transaction_pb2 import TransactionRequest # type: ignore

from loan_pb2_grpc import LoanServiceStub
from loan_pb2 import LoanRequest # type: ignore

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['bank']
collection = db['accounts']






app = Flask(__name__)
CORS(app)



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
    channel = grpc.insecure_channel('localhost:50051')
    client = AccountDetailsServiceStub(channel)
    if request.method == 'POST':
        print("+++++++++++++++++++++++++++++++++++++++++")
        print(request.form)

        email_id = request.form['email_id']
        account_type = request.form['account_type']
        address = request.form['address']
        govt_id_number = request.form['govt_id_number']
        government_id_type = request.form['government_id_type']
        name = request.form['name']

        try:
            # Create a gRPC request
            account_request = CreateAccountRequest(
                email_id=email_id,
                account_type=account_type,
                address=address,
                govt_id_number=govt_id_number,
                government_id_type=government_id_type,
                name=name
            )

            # Send the gRPC request to the Account Microservice
            response = client.createAccount(account_request)

            # Return a JSON response
            return jsonify({
                'success': True,
                'message': 'Account created successfully',
                'data': {
                    'response': MessageToDict(response)
                }
            })

        except grpc.RpcError as e:
            # Handle gRPC errors
            return jsonify({
                'success': False,
                'message': 'An error occurred during the gRPC request',
                'error': str(e)
            })

        except Exception as e:
            # Handle other exceptions
            return jsonify({
                'success': False,
                'message': 'An unexpected error occurred',
                'error': str(e)
            })
    return render_template('create_account_form.html')


@app.route('/account/allaccounts', methods=['GET', 'POST'])
def get_all_accounts():
    channel = grpc.insecure_channel('localhost:50051')
    client = AccountDetailsServiceStub(channel)
    if request.method == 'POST':
        print("+++++++++++++++++++++++++++++++++++++++++")
        print(request.form)

        email_id = request.form['email_id']

        get_req = GetAccountsRequest(email_id=email_id)
        response = client.getAccounts(get_req)
       
        
        return json.dumps({"response":[MessageToDict(acc) for acc in response.accounts]}) #response
    return jsonify({"response": None})





        

        


@app.route('/transaction', methods=['GET', 'POST'])
def transaction_form():
    if request.method == 'POST':
        sender_account_number = request.form['sender_account_number'] # type: ignore
        receiver_account_number = request.form['receiver_account_number'] # type: ignore
        amount = float(request.form['amount']) # type: ignore

        channel = grpc.insecure_channel('localhost:50052')
        client = TransactionServiceStub(channel)

        req = TransactionRequest(
            sender_account_number=sender_account_number,
            receiver_account_number=receiver_account_number,
            amount=amount
        )

        print("Sending transaction request...")

        response = client.SendMoney(req)

        return f"Transaction successful. Transaction ID: {response}"
    
    return render_template('transaction.html')



@app.route('/loan', methods=['GET', 'POST'])
def loan_form():
    # gRPC setup
    channel = grpc.insecure_channel('localhost:50053')
    client = LoanServiceStub(channel)
    if request.method == 'POST':
        account_number = request.form['account_number']
        amount = float(request.form['amount'])

        # Create a gRPC request
        loan_request = LoanRequest(account_number=account_number, amount=amount)

        # Send the gRPC request to the Loan Microservice
        response = client.ProcessLoanRequest(loan_request)
        # response.account_number = account_number

        print(f"Loan response: {response.approved}")

        return f"Loan Response: {response}"   #render_template('loan_result.html', response=response)

    return render_template('loan_form.html')


if __name__ == "__main__":
    app.run(debug=True)
