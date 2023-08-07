from locust import HttpUser, task
from api_urls import ApiUrls


class MyUser(HttpUser):
    host = ApiUrls["VITE_ATM_URL"]

    @task
    def atm_sequence(self):
        # Get all ATMs
        response = self.client.post("/")
        atm_data = response.json()

        # Loop through the ATM data and fetch details for each ATM
        for atm in atm_data:
            self.client.get(f"/{atm['_id']}")
