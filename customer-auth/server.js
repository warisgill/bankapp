import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { swaggerDocs } from './utils/swagger.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';

// connect to MongoDB Atlas database
import connectDB from './config/db.js';

// Load environment variables from .env file
dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// mounting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mounting routes
app.use('/api/users', userRoutes);

// Swagger documentation
swaggerDocs(app, port);

// Serve static files and handle client-side routing in production mode
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/ui/dist')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'ui', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('customer-auth API is running....');
  });
}

// error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`customer-api server started on port ${port}`);
});
