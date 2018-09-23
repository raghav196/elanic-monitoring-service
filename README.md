### Steps to run the service

1. Install the dependencies
    1.1 node (^v8.9.4)
    1.2 postgresql (^v9.1) Installtion reference: https://www.postgresql.org/docs/9.3/static/tutorial-install.html
2. Run the migrations
    2.1 First install **knex**. For this run `npm i -g knex` in the command line.
    2.2 Go to the root directory of the project and run the following command `knex migrate:latest`
3. Edit the `.env file`
```
NODE_ENV=dev
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=raghav
DATABASE_NAME=elanic
APP_PORT=4030
```
4. Install the dependencies
`npm i`
5. Finally, run the following command to start the server
`
npm start
`