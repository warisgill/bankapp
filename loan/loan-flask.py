import datetime
import os
from flask import Flask, request, jsonify
import logging

# set logging to debug
logging.basicConfig(level=logging.DEBUG)

from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://waris:test1122@cluster0.jk2md4w.mongodb.net/?retryWrites=true&w=majority"

db_host = os.getenv("DATABASE_HOST", "localhost")
# uri = f"mongodb://root:example@{db_host}:27017/"
client = MongoClient(uri)
db = client["bank"]
collection_accounts = db["accounts"]
collection_loans = db["loans"]




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
