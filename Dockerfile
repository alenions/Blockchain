FROM segurosfalabella.azurecr.io/sf/node:10-latest

ADD . /app

WORKDIR /app

CMD ["npm", "run", "start"]