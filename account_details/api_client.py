import grpc
from account_details_pb2_grpc import AccountDetailsServiceStub
from account_details_pb2 import *

channel = grpc.insecure_channel('localhost:50051')
client = AccountDetailsServiceStub(channel)

request = CreateAccountRequest(email_id="test", account_type="test", address="test", ssn_number="test", government_id="test", first_name="test", last_name="test")
response = client.createAccount(request)
print(response)