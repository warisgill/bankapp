from locust import HttpUser, task
from api_urls import ApiUrls
import random
from faker import Faker

fake = Faker()


class MyUser(HttpUser):
    host = ApiUrls["VITE_ACCOUNTS_URL"]

    def on_start(self):
        # Create fake user data
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
            "/create",
            data=self.user_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

    @task
    def account_sequence(self):
        # Get all accounts
        self.client.post(
            "/allaccounts",
            data={"email_id": self.user_data["email_id"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        # Get a particular account
        self.client.get(
            "/detail",
            data={"email": self.user_data["email_id"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
