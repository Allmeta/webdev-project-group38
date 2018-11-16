# Web development project 4 (IT2810)


## Introduction to FilmGuru&trade;
FilmGuru is a website that lets you search for movies. In esscense it's a front end interface for a movie database which is accessed through a rest api service that the client sends HTTP requests to.

### Functionality:
- **Search movie** titles by typing in the leftmost input field and clicking the search icon
- **Filter** the search on movie synopsis by starting to type in the input field. Example:
![Search and filter](https://i.imgur.com/501eQ4J.png)
- **Sort on rating** makes an API call which sorts all the movies by their respective ratings, either in ascending or descending order

*Disclaimer:* Since our assignment stated that both the search and sorting should be done on the server-side, our Filmguru&trade; does not support *sorting* on a result set from a search call. This is not how we would have implemented the sort functionaity, had we been given the choice.

Also, the filtering works only on the displayed movies. If the user wants more movies to be sorted by rating, one has to scroll further down in order to load more movies.

## Folder structure
Since we made a frontend client and a backend api for this project we decided to seperate these modules into different folders with completely seperate dependencies. The frontend code resides in the `client` folder and the backend code resides in the `server` folder. In the respective folders you will also find a short description of what the modules do and what their purpose is.


## Running the client, server and their respective tests
In their respective folders you will find instructions on how to run the different modules and their tests. Note that the api is running (hopefully) on a seperate server. Which means that you don't need to run the server locally for the client to function properly. The client is not dependent on the local server.

## Rest API deployment with Docker
Since we have the rest api running on a remote server, we had to deploy it to the server. We deployed it using Docker. With Docker you make a build script which executes and builds a Docker container to run your software. A Docker container is packaged software into standardized units for development, shipment and deployment which runs on top of the host operating system. This might sound like a fully fleshed out virtual machine, but it's not. It's only exactly what you need to run the software and furthermore it uses the host operating systems kernel which makes if very efficient and much less resource intensive than a virtual machine.

![Docker container](https://i.imgur.com/CmZVA3M.png)

## Database

The database system we used is PostgreSQL and it is hosted on an external server for easy access 24/7. We decided to use a relational database because we thought it would be a good fit for representing the relationship between different entities like `movies`and `genres`. Since we didn't really have any use for high write speeds or objects the descicion to choose an relational database system was an easy one.

The datasets for the whole application was retrieved from https://www.themoviedb.org/documentation/api via a python script. The cover images are also hosted on this site.

## Server libraries

### Joi
Joi is an object schema validation library which can validate that wheather javascript objects are of the correct format. We used this library to check that the json object recieved by PUT request were of the correct format and give appropriate errors if it was malformed.

### Rambda

[Rambda](https://ramdajs.com/) is a utility library written in a pure functional style. It is based on the core concepts of [functional programming](https://en.wikipedia.org/wiki/Functional_programming). We used this library for quality of life changes to our code. So that we don't need to "reinvent the wheel" when implementing new features by leveraging the functional style of Rambda. For example we used Rambda to [curry](https://en.wikipedia.org/wiki/Currying) the `queryBuilder` function (used to building SQL queries) for easier abstraction when making routes for the REST API.

## Client third party libraries and components
### Redux
Passing states between parents and children can be very tedious at times. Redux adds a global state so your app has a single state of truth.

The gif underneath shows how redux is implemented:

![Redux breakdown gif](http://5b0988e595225.cdn.sohucs.com/images/20170828/987a142d11fe4795878a2c991f449ffc.gif)

The Redux structure was set up with one actions-file, one actionTypes-file one reducers-file. The actions-file contained the different action creators, and the actionTypes-file held the possible actions. Two of the actions in the actionTypes looked like this:
```javascript
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const LOG_SEARCH = 'LOG_SEARCH'
// ++ more actions
```
We thought this was of doing it was very clear. The actionStyles are then imported into the actions-file:
```javascript
import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS
  // ++ more actions
} from '../actions/MovieActionTypes'
```

Our experience with redux was that is seemed a little overwhelming at first glance. The folder structure, store, actions and reducers seemed a bit confusing. After looking through some examples and tutorials, we experiencedd the advantages of not having to pass state up and down in a hierarchy of components.

Redux is surpisingly functional in design, with an immutable store which can only be accessed through pure functions (actions). We felt like this style of programming has large advantages over say object oriented programming where you are passing around mutable objects everywhere. This can make it hard to reason about what the code is actually doing, while redux on the otherhand is much more [declerative](https://en.wikipedia.org/wiki/Declarative_programming).

### React

React is a JavaScript framework for creating interfaces. The main differences between ReactJS and JS is the virtual DOM. React creates a datastructure in memory, estimates the difference between the VDOM and the DOM (the actual website), and only updates the components that has changed. Where in JS the whole DOM would rerender. ReactJS components lets the developer divide the interface into smaller, reuseable parts (components). Which makes the codbase smaller.

### Cross-Fetch
We used `cross-fetch` to query data from the REST API. We chose this library because it was recommended in many react-redux tutorials.

### Semantic UI
For our web application we needed some good looking front-end components. We decided to use the Semantic UI library because we liked the look of its components and the documentation for it was rich in detail. The library was used to create input fields, buttons and labels.


### Styled Components
We used the `styled` component from the `styled-components` library because it provides an easy-to-use, CSS-like way of styling your react components. Our opinion is that it also makes the code more structured. Furthermore styled components lets you leverage props in react to change the styling of elements.

#### Styled Components and Jest
To be able to run yarn test with styled components, we had to add the following to the package.json under “devDependencies” :
```javascript
"jest-styled-components": "^6.3.1",
```

## Testing

### Frontend
The goal for testing of frontend units was to focus testing on three different aspects. React components (what they render and their logic), different parts of redux like for example updating store or dispatching an action and lastly testing fetch calls to the rest api.

Early on we started writing unit testing for the different react components we implemented and this worked very well during the early stages of development. The big issue was that we started off implementing features without using redux, then transitioning component state into redux afterwards. When we started doing this the unit tests got left behind somewhat which meant that the code coverage slowly shrank and new complex features weren't tested thoroughly.

So what could have been done better? Firstly we should have continued updating the unit tests at the same pace when we started refactoring them for redux. Secondly we shouldn't have made direct calls to the rest api in our tests. This is bad practice, instead the calls should have been mocked out (we did however mock other aspects of the code like static files).

### Backend
For the backend unit testing consisted of testing all the routes and endpoints of the api to make sure they worked correctly. This meant making sure the that the Content-Type, status code and response objects for different scenarios are correct. For this we used a library called [supertest](https://github.com/visionmedia/supertest) which is an agent driven test library for testing api endpoints. This library allowed us to test our api routes programatically instead of having to set up a server and make api calls (which would have been more of an intigration test than a unit test).

The only test issue we had here was with a PUT request test which puts to the database and returns an object. Supertest returned a 500 internal server error response even though when we tested the PUT request manually everything worked as expected.

As always some aspects of the unit testing could have been done better. One of the biggest issues with testing the way we did is that since we are using the actual routes we are also making changes to the actual database. This is bad practice and we should have mocked away the database for testing, but the issue was that supertest doesn't allow for an easy way to do this. Realistically we would have had to find another server testing library or done all the testing manually to be able to mock away the database.

### Thunk
We needed to make API calls in order to fetch movies from our database on our server. In order to do this with Redux we use something called middleware which lets you dispatch asynchronous action creators so that we can wait for an HTTP response from the server before taking the appropriate actions to this response. The middlewares purpose is illustrated nicely in the animated GIF under our Redux discussion. We used the library called `redux-thunk` to achieve these asynchronous calls as it was recommended under the official Redux documentation and tutorials. Thunk was utilized to fetch movies, sorted movies and update movie comments.

### React test renderer
We used `react-test-renderer` to test components against snapshots. Mainly to test if they render correctly.

### Non-used endpoints

We ended up implementing more endpoints for the rest api than we actually used in the client. This was because we had several different ideas of how to represent different data so we decided to implement.




