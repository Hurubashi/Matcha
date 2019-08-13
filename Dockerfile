FROM node:10.16.2

WORKDIR .

COPY package.json .

RUN npm install

COPY . .

CMD npm start

EXPOSE 5000