# Deployment Guide (Render)

This guide explains how to deploy the CineStream Pro backend to Render.com.

## Prerequisites

1. A GitHub account with the code repository.
2. A Render.com account.
3. MongoDB Atlas cluster setup.
4. Cloudinary account setup.

## Steps to Deploy

1. Login to your Render dashboard.
2. Click on **New** and select **Web Service**.
3. Connect your GitHub account and select the `cinestream-server` repository.
4. Fill in the following details:
   - **Name**: `cinestream-server` (or any preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click on **Advanced** and add the following Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will assign a port, but this is a good default)
   - `MONGO_URI`: Your MongoDB Atlas connection string (make sure IP access is 0.0.0.0/0)
   - `JWT_SECRET`: A strong random string for JWT signing
   - `JWT_EXPIRE`: `30d`
   - `JWT_COOKIE_EXPIRE`: `30`
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret
6. Click **Create Web Service**.
7. Wait for the build and deployment process to complete. You will see a green **Live** status when done.
8. Your API will be accessible at the provided `*.onrender.com` URL.

## Production-Ready Features Included
- **Helmet**: Secures HTTP headers.
- **Rate Limiting**: Protects against brute-force attacks and limits repeated requests.
- **CORS**: Enabled for cross-origin requests.
- **Morgan**: Logging for monitoring requests.
- **Graceful Shutdown**: Handles process termination signals (SIGTERM).
- **Error Handling**: Centralized error catching and formatted JSON responses.
