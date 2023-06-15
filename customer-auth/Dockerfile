FROM node:18-alpine
WORKDIR /bankapp
EXPOSE 8000
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "auth"]