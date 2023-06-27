from concurrent import futures
import random
import datetime

import grpc

from loan_pb2 import LoanResponse
import loan_pb2_grpc

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['bank']
collection_accounts = db['accounts']
collection_loans = db['loans']




#  name = request.form['name']
#         email = request.form['email']
#         account_type = request.form['account_type']
#         account_number = request.form['account_number']
#         govt_id_type = request.form['govt_id_type']
#         govt_id_number = request.form['govt_id_number']
#         loan_type = request.form['loan_type']
#         loan_amount = float(request.form['loan_amount'])
#         interest_rate = float(request.form['interest_rate'])
#         time_period = request.form['time_period']


class LoanService(loan_pb2_grpc.LoanServiceServicer):
    def ProcessLoanRequest(self, request, context):
        
        name = request.name
        email = request.email
        account_type = request.account_type
        account_number = request.account_number
        govt_id_type = request.govt_id_type
        govt_id_number = request.govt_id_number
        loan_type = request.loan_type
        loan_amount = float(request.loan_amount)
        interest_rate = float(request.interest_rate)
        time_period = request.time_period


        # insert loan request into db
        loan_request = {
            "name": name,
            "email": email,
            "account_type": account_type,
            "account_number": account_number,
            "govt_id_type": govt_id_type,
            "govt_id_number": govt_id_number,
            "loan_type": loan_type,
            "loan_amount": loan_amount,
            "interest_rate": interest_rate,
            "time_period": time_period,
            "status": "Declined",
            "timestamp": datetime.datetime.now()
        }



        user_account = self.getAccount(account_number) 

        if user_account is None:
            return LoanResponse(approved=False)
        result =  self.approveLoan(user_account, loan_amount)
        print(f"Result {result}")

        message = "Loan Approved" if result else "Loan Rejected"
        loan_request['status'] = "Approved" if result else "Declined"

        collection_loans.insert_one(loan_request)

        response = LoanResponse(approved=result,  message=message)
        print(f"Account: {account_number}")
        print(f"Response: {response}")
        return response
    
    def getAccount(self, account_num):
        r = None
        accounts = collection_accounts.find()
        for acc in accounts:
            if acc['account_number'] == account_num:
                r = acc
                break     
        # print(f"Account {r}")
        return r
    
    def approveLoan(self, account, amount):
       
       if amount < 1:
           return False

       account['balance'] += amount
       
       collection_accounts.update_one({"account_number": account['account_number']}, {"$set": {"balance": account['balance']}})

       return True


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    loan_pb2_grpc.add_LoanServiceServicer_to_server(LoanService(), server)
    server.add_insecure_port('[::]:50053')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()

#  testing