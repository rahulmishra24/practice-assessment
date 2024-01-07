# practice-assessment
# Your Project Name

A brief description of your project.

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
