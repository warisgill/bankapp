import os

from flask import Flask, render_template, request
import grpc

from account_details_pb2 import GetAccountDetailsRequest # type: ignore
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



class Account:
    def __init__(self):
        self.account_number = ""
        self.account_holder_name = ""
        self.balance = 0.0
        self.currency = ""

    def __str__(self):
        return f"Account Number: {self.account_number}, Account Holder Name: {self.account_holder_name}, Balance: {self.balance}, Currency: {self.currency}"



# list ten random English names for account holders  
names = ["John", "Mary", "James", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"]

# # create index on account_number field
# collection.create_index("account_number", unique=True)


# for i in range(1, 10):
#     account = Account()
#     account.account_number = f"IBAN00000-{i}"
#     account.account_holder_name = f"User{i}"
#     account.balance = 100
#     account.currency = "USD"

#     if collection.find_one({"account_number": account.account_number}) is None:

#         collection.insert_one(account.__dict__)

# print(collection.find_one({"account_number": "IBAN00000-1"}))
    






app = Flask(__name__)




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


@app.route('/detail', methods=['GET', 'POST'])
def account_details():
    channel = grpc.insecure_channel('localhost:50051')
    client = AccountDetailsServiceStub(channel)
    if request.method == 'POST':
        account_number = request.form['account_number']

        # Create a gRPC request
        account_request = GetAccountDetailsRequest(account_number=account_number)

        # Send the gRPC request to the Account Details Microservice
        response = client.GetAccountDetails(account_request)

        return render_template('detail_result.html', response=response)

    return render_template('detail_form.html')

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
