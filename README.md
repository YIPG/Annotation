# Annotation App

This is the web app for annotation tasks.

## Caution
This project is on the way.
You can just upload tasks and view images and annotate each image.  
** But you cannot save annotation result to DB yet**

## Installation
You will need to prepare node(8.10.0 or later) and MongoDB on local.

### Yarn
```
yarn
```
### npm
```
npm intasll
```

## Quick Start
First you need to launch the server.
### Yarn
```
yarn start-server
```
### npm
```
npm run start-server
```

Then, launch the frontend.

### Yarn
```
yarn dev
```
### npm
```
npm run dev
```

In order to build the app, run below commands.

### Yarn
```
yarn build
```
### npm
```
npm run build
```

## Tasks
You can see the images you uploaded in `public/images`.

You can share the tasks via URL. `/tasks/TASK_ID`
