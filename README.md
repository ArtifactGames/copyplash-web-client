# Copyplash!
A web application to play Copyplash. Built with [create-react-app](https://github.com/facebook/create-react-app). 

Connects to [copyplash-web-service](https://github.com/ArtifactGames/copyplash-web-service) to join a game started by [copyplash-game](https://github.com/ArtifactGames/copyplash-game).

## Requirements
* [Node](https://github.com/nodejs/node)

## Setting up
```bash
# Clone the repository
git clone https://github.com/ArtifactGames/copyplash-web-client.git

# Go to the downloaded folder
cd copyplash-web-client

# Resolve and download dependencies
npm install
```

## Quick-launching
By default this will create an instance will be running on [localhost:3000](localhost:3000).
To be able to actually use this app on MacOS you have to run this command:
open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome

This way, the CORS security check of Chrome will be disabled, and you won’t need to stop all other instances since this command runs a new one

```bash
# Launches the project
npm start
```

## Building the project
By default the application will be built into the `build` folder inside the project.
```bash
npm run build
```