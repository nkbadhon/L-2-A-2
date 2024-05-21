import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();
// const port = 3000;

// using perser
app.use(express.json());
app.use(cors);

// Application routes

// When user hit /api/products this, it will take the process to the ProductRoutes.
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
