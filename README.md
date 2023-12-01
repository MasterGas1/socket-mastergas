# Inititializing Server

## Stack

- Node
- Express
- MongoDB

## Before instalation
Ask Manuel for you mongodb credentials to access database

## Instalation Steps

1. Install libraries use the command:

```
npm install
```

or

```
npm i
```

2. Rename .env.template to .env and add the next data

```
PORT= Server port
SECRET_KEY= Private key for bcrypt

USER_DB= User in mongodb in database access
PASSWORD_DB= User in mongodb generated in mongodb
CLUSTER= Mongodb cluster
DB_NAME= Database name 
```

#####  Note: Every time you update .env you need to restart the server

3. Lift Database with docker

```
docker-compose up -d
```

4. Build js files

```
npm start:build
```

or

```
tsc
```

5. Start server with

```
npm start
```

## Available Scripts

Inside The project you can run:

### `npm start:build`

This command can build our **.ts** files into **.js** files, this files are in **/build**. Use the command **tsc -w**

### `npm start:run`

This command run the project, use the build folder to run it. Use the command **nodemon build/index.js**

### `npm start`

This command run the two previous commands, the original command is **concurrently npm:start:\***
