
[![Build Status](https://travis-ci.com/YIPG/Annotation.svg?token=4Eu75y8n2jCAEm9jFfUz&branch=master)](https://travis-ci.com/YIPG/Annotation)

# Annotation App

<img src="https://user-images.githubusercontent.com/19145527/58791295-e4fd4f80-862c-11e9-9dc8-2c77aa45ddbf.gif" width="600px" />

This is the web app for annotation tasks.

## Installation
Install docker in your PC and clone this repo to your local. Then run below commands.

```
docker-compose up
```

Then open up browser, go to http://localhost:3000/ and now you can see the website! Tada!

## Deploy

You can pull production-built image here! ([Client](https://cloud.docker.com/repository/docker/yuyaito3/annotation-client), [Server](https://cloud.docker.com/repository/docker/yuyaito3/annotation-server), [nginx](https://cloud.docker.com/repository/docker/yuyaito3/annotation-nginx))

## Feature

### 1. Progress

You can get the progress.json via Admin Page.

<img src="https://user-images.githubusercontent.com/19145527/58790531-8683a180-862b-11e9-8903-7ef4c9256001.png" width="500px" />

### 2. Keyboard Operation

In the task page, you can move focus via keyboard.

- Move right -  :arrow_right: 
- Move left -  :arrow_left: 
- Move top - :arrow_up: 
- Move down -  :arrow_down: 
- Next image - ⌥ + :arrow_right:
- Prev Image - ⌥ + :arrow_left: 
