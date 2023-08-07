from locust import HttpUser, task, between
from api_urls import ApiUrls
from faker import Faker

fake = Faker()


class MyUser(HttpUser):

    host = ApiUrls["VITE_USERS_URL"]

    def on_start(self):

        # Create fake user data
        self.user_data = {
            "name": fake.unique.name(),
            "email": fake.unique.email(),
            "password": fake.unique.password(),
        }

        # Register
        self.client.post("/", json=self.user_data)

    @task
    def user_sequence(self):

        # Login
        self.client.post(
            "/auth",
            json={
                "email": self.user_data["email"],
                "password": self.user_data["password"],
            },
        )

        # Get Profile
        self.client.get(
            "/profile", json={"email": self.user_data["email"]}
        )

        # Update Profile
        self.client.put(
            "/profile",
            json={"email": self.user_data["email"], "address": fake.address()},
        )

        # Logout
        self.client.post(
            "/logout", json={"email": self.user_data["email"]}
        )
