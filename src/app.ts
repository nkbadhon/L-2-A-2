import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// using perser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend!');
});
// Application routes

// When user hit /api, it will take the process to the ProductRoutes.
app.use('/api', ProductRoutes, OrderRoutes);

export default app;
