# JobNest

JobNest is a React/Vite job portal with an Express and MongoDB API.

## Deploy to Vercel

Deploy the frontend and API as two Vercel projects from this repository. They
will both be hosted by Vercel; the frontend project is the public website and
the API project provides its backend.

### 1. Deploy the API

1. Import this GitHub repository as a new Vercel project.
2. Set **Root Directory** to `backend`.
3. Keep the framework preset on **Other** (or allow Vercel to detect Express).
   Use `npm run start` as the start command if Vercel asks for one.
4. Add these Production environment variables in **Settings → Environment
   Variables**:
   - `MONGO_URI`: your MongoDB Atlas connection string.
   - `JWT_SECRET`: a long, random secret used to sign login tokens.
5. In MongoDB Atlas, allow connections from your deployment. Do not commit the
   connection string or token secret to the repository.
6. Deploy and note the API project's production URL. Visiting its root should
   show “JobNest Backend is Running”.

### 2. Deploy the frontend

1. Import the same GitHub repository again as another Vercel project.
2. Set **Root Directory** to `jobNext/frontend`.
3. Set the framework preset to **Vite**. The build command is `npm run build`
   and the output directory is `dist`.
4. Add a Production environment variable named `VITE_API_URL` whose value is
   the API project's production URL, for example
   `https://your-api-project.vercel.app` (no trailing slash).
5. Deploy the frontend. Redeploy it after changing `VITE_API_URL`.

The frontend uses `http://localhost:5000` as its default API URL for local
development. Vercel builds use `VITE_API_URL` to connect to the deployed API.
