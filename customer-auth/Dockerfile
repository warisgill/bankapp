FROM node:10.16-alpine
WORKDIR /bankapp
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 8000
CMD ["npm", "start"]