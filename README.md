# JobNest

JobNest is a React/Vite job portal with an Express and MongoDB API.

## Deploy the complete app to Vercel

The root `vercel.json` configures the frontend and backend as services in one
Vercel project. The website and its `/api` endpoints share a single Vercel
domain.

1. Import `vu241fa04a78/jobnext-project` in Vercel and keep the project root at
   the repository root (`./`). Vercel uses `vercel.json` to configure the
   `backend` and `jobNext/frontend` services.
2. Add these Production environment variables to the Vercel project:
   - `MONGO_URI`: your MongoDB Atlas connection string.
   - `JWT_SECRET`: a long, random secret used to sign login tokens.
3. In MongoDB Atlas, allow connections from your deployment. Do not commit the
   connection string or token secret to the repository.
4. Deploy. The frontend calls the backend through `/api`; visiting `/api/jobs`
   should return the current job list.

For local development, the Vite server proxies `/api` requests to
`http://localhost:5000`. Start the backend and frontend in separate terminals.
The frontend can optionally use `VITE_API_URL` to target a separately hosted
API; leave it unset when using the single-project Vercel deployment.
