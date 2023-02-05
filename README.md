# Inititializing Server

## Stack
- Node
- Express
- MongoDB

## Instalation Steps

1. Install librarys use the command:
```
npm install
```
 or 
 ```
 npm i
 ```

2. Lift Database with docker
 ```
 docker-compose up -d
 ```

3. Build js files
```
npm start:build
```
or
```
tsc
```

4. Start server with
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
This command run the two previous commands, the original command is **concurrently npm:start:***




