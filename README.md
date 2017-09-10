#README

This application is built using different technologies.

- For the database I'm using [MongoDB](https://www.mongodb.com/) within a [Docker](http://www.docker.com/) container.
- The server is built with [Node.js](https://nodejs.org/en/) and [Express.js](http://expressjs.com/)
- The frontend is built with [Vue.js 2.0](https://vuejs.org/v2/)
- As bundler Webpack 3.0

To run the application in "development" mode use, first you need to instantiate the docker container for Mongo
```bash
docker-compose up -d
```
then you can run the application with 

```bash
npm start
```

