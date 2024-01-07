# practice-assessment
# Note Sharing Project

A Practice Assessment for creating, fetching and sharing notes by providing authentication with rate limiting system.

## Running the Project

To run the project locally, you need to have Docker Compose installed. If you don't have it installed, you can follow the instructions [here](https://docs.docker.com/compose/install/).

1. Clone the repository:

   ```bash
   git clone https://github.com/rahulmishra24/practice-assessment.git

2. Navigate to the project directory:

      ```bash
      cd practice-assessment

3. Run the Project:
     ```bash
     docker-compose up

4. Run the Test:
   ```bash
    npm run test


## Table of Contents

- [Authentication API](#authentication-api)
  - [Signup](#signup)
  - [Login](#login)
- [Notes API](#notes-api)
  - [Fetch All Notes](#fetch-all-notes)
  - [Fetch a Note by ID](#fetch-a-note-by-id)
  - [Create a New Note](#create-a-new-note)
  - [Update a Note by ID](#update-a-note-by-id)
  - [Delete a Note by ID](#delete-a-note-by-id)
  - [Share a Note](#share-a-note)
  - [Search Notes](#search-notes)

## Authentication API

### Signup

Endpoint: `POST /auth/signup`

Creates a new user by providing a unique username and a password. Passwords are securely hashed using bcrypt.

Request Body:

```json
{
  "username": "example_user",
  "password": "example_password"
}
```

Response:
{
  "message": "User created successfully"
}

### Login

Endpoint: `POST /auth/login`

Authenticates a user by verifying the provided username and password. Returns a JSON Web Token (JWT) upon successful login.

Request Body:

```json
{
  "username": "example_user",
  "password": "example_password"
}
```

## Notes API

### Fetch All Notes

Endpoint: `GET /api/notes/fetch`

Retrieves all notes for the authenticated user.

Response:

```json
[
  {
    "_id": "note_id_1",
    "title": "Note 1",
    "content": "This is the content of note 1"
  },
  {
    "_id": "note_id_2",
    "title": "Note 2",
    "content": "This is the content of note 2"
  }
  // ... other notes
]
```



### Fetch a Note by ID

Endpoint: `GET /api/notes/fetch/:id`

Retrieves a specific note by providing its ID.

Response:

```json
{
  "_id": "note_id",
  "title": "Note Title",
  "content": "Note Content"
}
```

### Create a New Note

Endpoint: `POST /api/notes/`

Creates a new note for the authenticated user.

Request Body:

```json
{
  "title": "New Note",
  "content": "This is the content of the new note"
}
```

Response
{
  "message": "Note created successfully"
}

### Update a Note by ID

Endpoint: `PUT /api/notes/:id`

Updates a specific note by providing its ID.

Request Body:

```json
{
  "title": "Updated Note Title",
  "content": "Updated Note Content"
}
```

Response
{
  "_id": "note_id",
  "title": "Updated Note Title",
  "content": "Updated Note Content"
}

### Share a Note

Endpoint: `POST /api/notes/:id/share`

Shares a specific note with another user.

Response:

```json
{
  "_id": "note_id",
  "title": "Shared Note Title",
  "content": "Shared Note Content",
  "sharedWith": "user_id"
}
```


### Delete a Note by ID

Endpoint: `DELETE /api/notes/:id`

Deletes a specific note by providing its ID.

Response:

```json
{
  "message": "Note deleted successfully"
}
```


### Search Notes

Endpoint: `GET /api/notes/search`

Searches for notes based on a search query.

Query Parameters:

- `searchString`: The search query.

Response:

```json
[
  {
    "_id": "note_id_1",
    "title": "Note 1",
    "content": "This is the content of note 1"
  },
  {
    "_id": "note_id_2",
    "title": "Note 2",
    "content": "This is the content of note 2"
  }
  // ... other matching notes
]
```











