# code-editor
A code editor with a back end for compiling code remotely. Written in node &amp; react. Work in progress.
No production environment is written at this time. 
The node server takes the written code from the React application and compiles it by spawning a shell and running a generated script.
## Installation & running
### Install
```
cd code-editor
yarn install
cd client
yarn install
```
### Run
To start the server: 
```
yarn start
```

To start the dev server:
```
cd client
yarn start
```

Go to ```localhost:3000``` in your browser after the dev server has started.
The server is running on port 3001.
