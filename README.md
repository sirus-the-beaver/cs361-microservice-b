# User Preferences Microservice

## Overview
This microservice handles getting and saving user preferences (such as dietary restrictions and allergies), and getting recipe recommendations based on a user's preferences, a user's excluded recipes, and inputted ingredients.

## Features
- Setting preferences
- Getting recipe recommendations that match user preferences

## Tech Stack
- Node.js, Express
- **Database**: MongoDB
- **Communication**: REST API
- **API**: [Spoonacular API](https://spoonacular.com/food-api)
- **Deployment**: Heroku

## API Documentation
### Base URL
```https://dishfindr-microservice-b-0d2b598a2033.herokuapp.com```

### Endpoints
```GET /preferences/:userId```
- **Description**: Fetches a user's saved preferences from the database.
- **Query Parameters**:
    - ```userId```: (string) The user's MongoDB ID
- **Response**:
```json
{
    "userId": "String",
    "dietaryRestrictions": ["String"],
    "allergies": ["String"]
}
```

```POST /preferences```
- **Description**: Saves/updates a user's preferences to the database.
- **Request Body**:
```json
{
    "userId": "String",
    "dietaryRestrictions": ["String"],
    "allergies": ["String"]
}
```

```POST /recommendations```
- **Description**: Gets recipe recommendations based on a user's preferences, and excludes results that the user has purposely excluded.
- **Request Body**:
```json
{
    "ingredients": ["String"],
    "ignorePantry": Boolean,
    "userId": "String"
}
```
- **Response**:
```json
{
    "offset": Number,
    "number": Number,
    "results": [
        {
            "id": Number,
            "title": "String",
            "image": "String",
            "imageType": "String"
        }
    ],
    "totalResults": Number
}
```