
# Project Name
 Graphic Opinion
<br>

# Quick Compo

<br>

## Description

This application is for people to create polls to know the real opinion of other people about a specific subject, other people can interact and vote and if they want they can leave a comment about the subject.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
-  **Create Polls :** As a logged in user I can access the add polls page so that I can create a new poll.
-  **Polls List:** As a logged in user I can access the polls list page so that I can access the list I created.
-  **Voting details:** As a user I can see data and results of votes.
-  **Home page:** As a user I can use filters to search polls and choose one to vote.
-  **Voting Page:** As a user I choose my option and submit.




## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/home`                      | HomePage             | public `<Route>`           | Home page has all poll list.                              |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/poll/add`                  | PollPage             | user only `<PrivateRoute>` | Create new poll form.                                     |
| `/votepage/:Id`              | VotePage             | user only `<PrivateRoute>` | Page that you can vote.                                   |
| `/vote/details/:id`          | VoteDetailPage       | public `<Route>`           | Vote details. Shows all polls details.                    |
| `/pollList/:Id`              | PollList             | user only `<PrivateRoute>` | List of polls created                                     |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreatePoll

- VotePage

- VoteDetailsPage

- PollListPage

  

Components:

- User
- Poll
- Comments






## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Poll Service**

  - `PollService` :
    - `.addPoll(pollData)`
    - `.getPoll()`
    - `.getOnePoll(id)`
    - `.deletePoll(id)`

- **Player Service**

  - `playerService` :
    - `.createPlayer(id)`
    - `.getPlayerDetails(id)`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: img },
  createdPolls: [ { type: Schema.Types.ObjectId, ref:'User' } ],
}
```



**Poll model**

```javascript
 {
   question: { type: String, required: true },
   theme: { type: Boolean, required: true },
   img: { type: String },
   description: { type: String, required: true },
   options: { type: String, required: true },
   voteCount: { type: Num }
   selection: [{ type: }]
 }
```



**Comment model**

```javascript
{
  authur: { type: Schema.Types.ObjectId, ref:'User' }
  comment: { type: String, required: true },
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page 
| PUT         | `/api/profile/edit/:id`| { name, img,  }              | 200            | 400          | edit tournament                                           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409),                                                                                                      then create user with encrypted password, and store user in session 
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if                                                                                                                  password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/home`                |                              |                | 400          | Show all poll                                         |
| GET         | `/api/poll/:id`        |                              |                |              | Show specific poll                                    |
| POST        | `/api/poll`            | { name, img,  }              | 201            | 400          | Create and save a new poll                             |
| DELETE      | `/api/poll/:id`        |                              | 201            | 400          | delete poll                                            |
| GET         | `/api/poll/:id`        |                              |                |              | show specific poll                                         |
| POST        | `/api/comment`         | { name, img, tournamentId }  | 200            | 404          | add comment                                                  |
| DELETE      | `/api/comment/:id`     |                              | 200            | 400          | delete comment                                                |


<br>

## API's
 https://geoapi.pt/municipio/?json=1
<br>

## Packages
https://www.chartjs.org/docs/latest/getting-started/installation.html
<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

Luísa Coelho - <marillu777> - <https://www.linkedin.com/in/luisamariacoelho07>
