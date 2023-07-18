from concurrent import futures
import datetime
from bson.objectid import ObjectId
import os
import grpc
# Configure the logging settings
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
from transaction_pb2 import * 
import transaction_pb2_grpc 

from google.protobuf.json_format import MessageToDict


import logging
# set logging to debug
logging.basicConfig(level=logging.DEBUG)

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"
db_host = os.getenv("DATABASE_HOST", "localhost")
# uri = f"mongodb://root:example@{db_host}:27017/"

client = MongoClient(uri)
db = client['bank']
collection_accounts = db['accounts']
collection_transactions = db['transactions']


# class GlobalTransactionService:
    





class TransactionService(transaction_pb2_grpc.TransactionServiceServicer):
    def SendMoney(self, request, context):      
        sender_account =  self.__getAccount(request.sender_account_number)
        receiver_account = self.__getAccount(request.receiver_account_number)
        return self.__transfer(sender_account, receiver_account, request.amount, request.reason)
    
    def getTransactionByID(self, request, context):
        transaction_id = request.transaction_id
        logging.debug(f"Transaction ID: {transaction_id}")
        transaction = collection_transactions.find_one({"_id": ObjectId(transaction_id)})
        logging.debug(f"Transaction: {transaction}")
        if transaction is None:
            return Transaction()
        return Transaction(account_number=transaction['receiver'], amount=transaction['amount'], reason=transaction['reason'], time_stamp=f"{transaction['time_stamp']}", type= "credit", transaction_id=str(transaction['_id']))
             


    def getTransactionsHistory(self, request, context):
        account_number = request.account_number 
        # logging.debug(f"Account Number: {account_number}")
        
        # find based on account number only based on sender
        transactions_credit = collection_transactions.find({"sender":account_number})
        transactions_debit = collection_transactions.find({"receiver":account_number})
        
        # logging.debug(f"--------T: {transactions_itr}")
        t = Transaction()
        # logging.debug(f"--- t: {t}")

        transactions_list = []
        for t in transactions_credit:
            # logging.debug(f"----> t: {list(t.keys())}")
            # logging

            temp_t = Transaction(account_number=t['receiver'], amount=t['amount'], reason=t['reason'], time_stamp=f"{t['time_stamp']}", type= "credit", transaction_id=str(t['_id']))
            transactions_list.append(temp_t)
        
        for t in transactions_debit:
            # logging.debug(f"----> t: {list(t.keys())}")
            temp_t = Transaction(account_number=t['sender'], amount=t['amount'], reason=t['reason'], time_stamp=f"{t['time_stamp']}", type= "debit", transaction_id=str(t['_id']))
            transactions_list.append(temp_t)
        
        # logging.debug(transactions_list)
        
        
        return GetALLTransactionsResponse(transactions=transactions_list)
    
    def Zelle(self, request, context):
        sender_email = request.sender_email
        receiver_email = request.receiver_email
        amount = request.amount
        reason = request.reason

        sender_account = self.__getAccountwithEmail(sender_email)
        receiver_account = self.__getAccountwithEmail(receiver_email)

        if sender_account is None: 
            t = TransactionResponse(approved = 'no', msg="Sender Account Not Found.")
            logging.debug(f"sender {t}")
            return t
        
        if receiver_account is None:
            t = TransactionResponse(approved = 'no', msg="Receiver Account Not Found.")
            # t.result = 'False'
            # t.msg = "Receiver Account Not Found."
            # ks = list(t.keys())
            # logging.debug(f"-------> receiver {ks}")
            # t = MessageToDict(t)
            logging.debug(f"receiver {t}")
            logging.debug(f"receiver {t}")
            return t


        return self.__transfer(sender_account, receiver_account, amount, reason)
    
    def __transfer(self, sender_account, receiver_account, amount, reason):
        # if sender_account is not None or receiver_account is not None:
        result = self.__doTransaction(sender_account, receiver_account, amount, reason=reason)
        
        logging.debug(f"---> sender: {sender_account}" )
        logging.debug(f"--->receiver: {receiver_account}")
        if result: 
            return TransactionResponse(approved=result, msg="Transaction is Successful.")
            
        return TransactionResponse(approved = 'no', msg="Transaction Failed")
    
    def __doTransaction(self, sender, receiver, amount, reason=""):
        if sender['balance'] < amount:
            return 'no'
        
        sender['balance'] -= amount
        receiver['balance'] += amount

        # update sender account
        collection_accounts.update_one({"account_number": sender['account_number']}, {"$set": {"balance": sender['balance']}})
        
        # update receiver account
        collection_accounts.update_one({"account_number": receiver['account_number']}, {"$set": {"balance": receiver['balance']}})

        # add transaction
        collection_transactions.insert_one({"sender": sender['account_number'], "receiver": receiver['account_number'], "amount": amount, "reason":reason, 'time_stamp': datetime.datetime.now()})

        return 'yes'
    
    def __getAccountwithEmail(self, email):
        logging.debug(f"Email: {email}")
        # log the document with the email
        logging.debug(f"Document with email: {collection_accounts.count_documents({'email_id': email, 'account_type': 'Checking'})}")
        
        document = None

        if collection_accounts.count_documents({'email_id': email, 'account_type': 'Checking'}) == 1:
            checking_account = collection_accounts.find({'email_id': email, 'account_type': 'Checking'})
            document = checking_account[0]
            logging.debug(f"Checking Account: {document}")
            return document
        else:
            if collection_accounts.count_documents({'email_id': email, 'account_type': 'Savings'})== 1:
                saving_account = collection_accounts.find({'email_id': email, 'account_type': 'Savings'})
                document = saving_account[0]
                logging.debug(f"Savings Account: {document}")
                return document
            # logging.debug(f"Savings Account: {document}")
        logging.debug('No Account Found')      
        return document
    
    def __getAccount(self, account_num):
        r = None
        accounts = collection_accounts.find()
        # logging.debug(f"Accounts: {list(accounts)}") 
        for acc in accounts:
            if acc['account_number'] == account_num:
                r = acc
                break     
        # logging.debug(f"Account {r}")
        return r
    
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    transaction_pb2_grpc.add_TransactionServiceServicer_to_server(TransactionService(), server)
    server.add_insecure_port('[::]:50052')
    logging.debug('Starting server. Listening on port 50052.')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()


