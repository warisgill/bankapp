import grpc 

from loan_pb2_grpc import LoanServiceStub
from loan_pb2 import LoanRequest 

channel = grpc.insecure_channel('localhost:50053')
client = LoanServiceStub(channel)

reuest = LoanRequest(account_number="3", amount=10.0)

response = client.ProcessLoanRequest(reuest)

print(response)