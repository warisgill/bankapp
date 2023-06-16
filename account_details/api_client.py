import grpc
from account_details_pb2_grpc import AccountDetailsServiceStub
from account_details_pb2 import Account, GetAccountDetailsRequest

channel = grpc.insecure_channel('localhost:50051')
client = AccountDetailsServiceStub(channel)

request = GetAccountDetailsRequest(account_number="1")

response = client.GetAccountDetails(request)

print(response)
