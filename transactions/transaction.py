from concurrent import futures
import random

import grpc

from transaction_pb2 import TransactionResponse # type: ignore

import transaction_pb2_grpc 


from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['bank']
collection = db['accounts']




class TransactionService(transaction_pb2_grpc.TransactionServiceServicer):

    def getAccount(self, account_num):
        r = None

        accounts = collection.find()
        # print(f"Accounts: {list(accounts)}") 
        for acc in accounts:
            if acc['account_number'] == account_num:
                r = acc
                break     
        # print(f"Account {r}")
        return r
    
    def doTransaction(self, sender, receiver, amount):
        if sender['balance'] < amount:
            return False
        
        sender['balance'] -= amount
        receiver['balance'] += amount

        # update sender account
        collection.update_one({"account_number": sender['account_number']}, {"$set": {"balance": sender['balance']}})
        
        # update receiver account
        collection.update_one({"account_number": receiver['account_number']}, {"$set": {"balance": receiver['balance']}})


        return True


    def SendMoney(self, request, context):
        
        sender_account =  self.getAccount(request.sender_account_number)
        receiver_account = self.getAccount(request.receiver_account_number)

        

        if sender_account is not None or receiver_account is not None:
            result = self.doTransaction(sender_account, receiver_account, request.amount)
            
            print(f"---> sender: {sender_account}" )
            print(f"--->receiver: {receiver_account}")

            if result: 
                return TransactionResponse(success=result, message="Transaction Successful")
            else:
                return TransactionResponse(success=result, message="Transaction Failed")
        
        # handle if sender or receiver account is not found
        return TransactionResponse()



def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    transaction_pb2_grpc.add_TransactionServiceServicer_to_server(TransactionService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()


