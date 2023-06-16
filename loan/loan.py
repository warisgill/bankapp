from concurrent import futures
import random

import grpc

from loan_pb2 import LoanResponse
import loan_pb2_grpc

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['bank']
collection = db['accounts']




class LoanService(loan_pb2_grpc.LoanServiceServicer):
    def ProcessLoanRequest(self, request, context):

        account = self.getAccount(request.account_number)

        if account is None:
            return LoanResponse(approved=False)
        result =  self.approveLoan(account, request.amount)
        print(f"Result {result}")

        message = "Loan Approved" if result else "Loan Rejected"

        response = LoanResponse(approved=result,  message=message)
        print(f"Account: {account}")
        print(f"Response: {response}")
        return response
    
    def getAccount(self, account_num):
        r = None
        accounts = collection.find()
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
       
       collection.update_one({"account_number": account['account_number']}, {"$set": {"balance": account['balance']}})

       return True


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    loan_pb2_grpc.add_LoanServiceServicer_to_server(LoanService(), server)
    server.add_insecure_port('[::]:50053')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()