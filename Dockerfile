FROM node:15

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ] 



