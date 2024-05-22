import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

// using perser
app.use(express.json());
app.use(cors());

// Application routes

// When user hit /api, it will take the process to the ProductRoutes.
app.use('/api', ProductRoutes);

export default app;
