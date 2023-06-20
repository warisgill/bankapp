from concurrent import futures
import random

import grpc


from account_details_pb2 import *

import account_details_pb2_grpc


# creat a list of accounts and fill with dummy data

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['bank']
collection = db['accounts']





class AccountDetailsService(account_details_pb2_grpc.AccountDetailsServiceServicer):

    def getAccountDetails(self, request, context):
        accounts = collection.find()
        for account in accounts:
            if account['account_number'] == request.account_number:
                return GetAccountDetailResponse(account=Account(account_number=account['account_number'], account_holder_name=account['account_holder_name'], balance=account['balance'], currency=account['currency']))
        return GetAccountDetailResponse()
    
    def createAccount(self, request, context):
        collection.insert_one({'account_number': request.account_number, 'account_holder_name': request.account_holder_name, 'balance': request.balance, 'currency': request.currency})
        return CreateAccountResponse(message='Account Created Successfully')
    

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    account_details_pb2_grpc.add_AccountDetailsServiceServicer_to_server(AccountDetailsService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
