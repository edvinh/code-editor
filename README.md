# code-editor

A code editor with a back end for compiling code remotely. Written in node &amp; react. Work in progress.
No production environment is written at this time.
The node server takes the written code from the React application and compiles it by spawning a docker container and running a generated script.

The application is developed in a Windows environment but should work on Linux as well.

## Installation & running

### Dependencies

* Node ^8
* MongoDB
* Docker
* Docker containers

#### Docker Containers

A docker container for each language needs to be downloaded:

* Node
* Golang
* gcc
* Haskell
* Python
* Java

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

Go to `localhost:3000` in your browser after the dev server has started.
The server is running on port 3001.
