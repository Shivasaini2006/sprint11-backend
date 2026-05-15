# API Documentation

## Authentication APIs

### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get Profile
- **URL**: `/api/auth/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

## Movie APIs

### Get All Movies
- **URL**: `/api/movies`
- **Method**: `GET`
- **Auth Required**: No

### Get Single Movie
- **URL**: `/api/movies/:id`
- **Method**: `GET`
- **Auth Required**: No

### Create Movie
- **URL**: `/api/movies`
- **Method**: `POST`
- **Auth Required**: Yes (User or Admin)
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `title`: String
  - `description`: String
  - `genre`: String
  - `rating`: Number (1-10)
  - `releaseYear`: Number
  - `poster`: File (Image)

### Update Movie
- **URL**: `/api/movies/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (User or Admin)
- **Content-Type**: `multipart/form-data`

### Delete Movie
- **URL**: `/api/movies/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Admin only)
