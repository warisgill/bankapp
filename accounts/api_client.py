import grpc
from accounts_pb2_grpc import *
from accounts_pb2 import *

channel = grpc.insecure_channel('127.0.0.1:50051')
client = AccountDetailsServiceStub(channel)

request = CreateAccountRequest(email_id="test", account_type="test", address="test",  govt_id_number="test", government_id_type="test",  name="test")
response = client.createAccount(request)
print(response)