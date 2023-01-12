# fastify-api
NodeJS CRU API with Fastify, with authentication using JWT, and local MongoDB.

### Dependencies
run `npm install` to install all Dependencies

### MongoDB
This app uses local mongodb installation, so you need to install mongodb locally or run a Docker container image.

### .env
copy the content of env.sample file, create .env file and paste the content there. (mind the port your mongoDB exposed to and change it if needed)

### Running the app
use the command `npm run dev` to run the app in development mode

### available endpoints

notes endpoints
- GET domain:port/notes (get all notes)
- GET domain:port/notes/:id (get specific note)
- POST domain:port/notes (create note)
- PUT domain:port/notes (update note)
- DELETE domain:port/notes (delete note)

users endpoints
- GET domain:port/ (welcome page)
- POST domain:port/login (get token)
- GET domain:port/users (get all users)
- GET domain:port/users/:username (get specific user)
- POST domain:port/users (create user)
- PUT domain:port/users (update user), bearer token required, create user and send request to login endpoint to get a token
- DELETE domain:port/users (delete user)

note: check schema files to know the required json schema for each endpoint.

