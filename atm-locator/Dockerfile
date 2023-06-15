FROM node:18-alpine
WORKDIR /bankapp
EXPOSE 8001
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "atm"]