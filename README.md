# Annotation App

<img src="https://user-images.githubusercontent.com/19145527/58791295-e4fd4f80-862c-11e9-9dc8-2c77aa45ddbf.gif" width="600px" />

This is the web app for annotation tasks.

## Installation
You will need to prepare node(8.10.0 or later) and MongoDB on local. (You can install MongoDB [here](https://docs.mongodb.com/manual/installation/))
Then, clone this repository and run commands.

### Yarn
```
yarn
```
### npm
```
npm intasll
```

## Quick Start

### Yarn
```
yarn start
```
### npm
```
npm run start
```

## Build

In order to build the app, run below commands.

### Yarn
```
yarn build
```
### npm
```
npm run build
```

## Dockerize (experimental)
You can also install apps by Docker. Go to `dockerize` branch and run `docker-compose up`

#### Development Architecture
<img src="https://user-images.githubusercontent.com/19145527/59350266-a6ffda00-8d56-11e9-9559-5cdc1e2fdc3c.png" width="350px" />

#### Production Architecture
<img src="https://user-images.githubusercontent.com/19145527/59351430-5938a100-8d59-11e9-8c46-871f9b87c934.png" width="350px" />


## Feature

### Progress

You can get the progress.json via Admin Page.

<img src="https://user-images.githubusercontent.com/19145527/58790531-8683a180-862b-11e9-8903-7ef4c9256001.png" width="500px" />

### Keyboard Operation

In the task page, you can move focus via keyboard.

- Move right -  :arrow_right: 
- Move left -  :arrow_left: 
- Move top - :arrow_up: 
- Move down -  :arrow_down: 
- Next image - ⌥ + :arrow_right:
- Prev Image - ⌥ + :arrow_left: 
