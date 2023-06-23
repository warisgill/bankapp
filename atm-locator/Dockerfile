FROM node:14
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app
RUN npm install
COPY . ./
EXPOSE 8001
CMD ["npm", "start"]