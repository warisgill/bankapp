FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY ui/ ./ui/
RUN cd ui && npm install && npm run ui

FROM node:18 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/ui/build ./ui/build
COPY customer-auth/package*.json ./customer-auth/
RUN cd customer-auth && npm install
COPY customer-auth/* ./customer-auth/

EXPOSE 8000

CMD ["node", "./customer-auth/server.js"]