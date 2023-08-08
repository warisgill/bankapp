FROM --platform=linux/amd64 python

RUN mkdir /service
COPY performance_tests/locust/ /service/locust/
WORKDIR /service/locust
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

RUN chmod +x locust.sh

EXPOSE 8089 5557 5558
ENTRYPOINT ["bash", "locust.sh"]