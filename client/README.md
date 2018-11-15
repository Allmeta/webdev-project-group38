# Client
This is the folder for our client module where you can search for moviesand filter them on different properties. This is done through making http request to the rest api, manipulating the data and finally displaying it. The client acts as the user interface for retrieving movie information graphically.

## Running the client on a development server
To run the client in development mode you first have to install the `yarn` package manager. Then you can install all the local dependencies by running `yarn`. Finally you can start the development server by running `yarn start`.

## Building the client
If you want to build the client module for production you can run the command `yarn build`. Yarn will build into the `build/` folder. From there you can serve it.

## Running the unit tests
To run the unit tests for the client you need to have all the local dependencies installed as described above. Then you can simply run `yarn test`. 