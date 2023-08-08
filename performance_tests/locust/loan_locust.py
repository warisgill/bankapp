from locust import HttpUser, task
from api_urls import ApiUrls
import random
from faker import Faker

fake = Faker()


class MyUser(HttpUser):
    host = ApiUrls["VITE_LOAN_URL"]

    def on_start(self):

        account_host = ApiUrls["VITE_ACCOUNTS_URL"]
        # Create fake account data
        self.user_data = {
            "name": fake.unique.name(),
            "email_id": fake.unique.email(),
            "account_type": random.choice(
                ["Checking", "Savings", "Money Market", "Investment"]
            ),
            "government_id_type": random.choice(
                ["Driver's License", "Passport", "SSN"]
            ),
            "govt_id_number": fake.unique.ssn(),
            "address": fake.unique.address(),
        }

        # Create a new account
        self.client.post(
            f"{account_host}/create",
            data=self.user_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        
        # Get all accounts
        response = self.client.post(
            f"{account_host}/allaccounts",
            data={"email_id": self.user_data["email_id"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        self.account_number = response.json()["response"][0]["account_number"]

    @task
    def account_sequence(self):
        # Apply for a loan
        self.user_data["account_number"] = self.account_number
        self.user_data["loan_amount"] = random.randint(1000, 10000)
        self.user_data["loan_type"] = random.choice(["Base Camp", "Rover", "Potato Farming", "Ice Home", "Rocker"])
        self.client.post(
            "/",
            data=self.user_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        # Get all loans
        self.client.post(
            "/history",
            data={"email": self.user_data["email_id"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
