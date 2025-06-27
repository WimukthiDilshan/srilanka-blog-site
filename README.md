# Sri Lanka Beautiful Places Blog

A full-stack blog platform to discover and share the most stunning places in Sri Lanka! Users can register, log in, create posts with multiple photos, and browse posts from others.

## Features
- User registration and login (JWT authentication)
- Persistent login (remains logged in after refresh)
- Create, edit, and delete blog posts
- Upload multiple photos per post
- Responsive, modern UI with creative design
- View all posts and post details

## Project Structure
```
blog post/
  client/    # React frontend
  server/    # Node.js/Express backend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### 1. Clone the repository
```
git clone <your-repo-url>
cd blog\ post
```

### 2. Setup the Backend (server)
```
cd server
npm install
```

Create a `.env` file in `server/` with:
```
MONGO_URI=mongodb://localhost:27017/srilanka_blog
JWT_SECRET=your_jwt_secret
```

Start the backend:
```
npm start
```

### 3. Setup the Frontend (client)
```
cd ../client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### 4. Usage
- Register a new account or log in.
- Create a blog post with multiple photos.
- Browse all posts on the home page.
- Click "Read More" to view post details and all images.
- Edit or delete your own posts.

## Customization
- Change the background video/images in `client/public/`.
- Update styles in the React components for your own creative touch.

## Troubleshooting
- If you see CORS or network errors, make sure both client and server are running and the ports match the URLs in the code.
- If you can't stay logged in after refresh, check your `.env` and JWT setup.

## License
MIT 