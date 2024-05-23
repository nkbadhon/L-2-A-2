import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';

// Create Orders
const createOrder = async (req: Request, res: Response) => {
  try {
    // Getting value from user request body
    const { orders } = req.body;

    // Creating schema validation using Zod
    const zodParseData = orderValidationSchema.parse(orders);

    // Extracting order details to match with product
    const orderQuantity = zodParseData.quantity;
    const orderProductId = zodParseData.productId;

    // Checking if the product quantity is available
    const product =
      await ProductServices.getSingleProductFromDB(orderProductId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product[0].inventory.quantity < orderQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient product quantity available',
      });
    }

    // Call service function to create the order
    const result = await OrderServices.createOrderInDB(zodParseData);

    // Decrease the quantity value of the product by the order quantity
    product[0].inventory.quantity -= orderQuantity;

    // Update inStock status based on remaining quantity
    if (product[0].inventory.quantity <= 0) {
      product[0].inventory.quantity = 0;
      product[0].inventory.inStock = false;
    }
    await ProductServices.updateSingleProductFromDB(orderProductId, product[0]);

    // Send response to the user
    res.status(200).json({
      success: true,
      message: 'Order added successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // To get a single order based on email
    const { email } = req.query;

    let result;
    if (email) {
      if (typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Invalid email parameter',
        });
      }

      result = await OrderServices.getSingleOrderFromDB(email);
      res.status(200).json({
        success: true,
        message: `Data for ${email} Retrived Successfully`,
        data: result,
      });
    } else {
      // Get all orders
      result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: `All Orders Retrived Successfully`,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
