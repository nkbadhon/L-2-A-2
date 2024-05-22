import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    // will call service function to send this data
    const result = await ProductServices.createProductInDB(product);
    // send response to the user
    res.status(200).json({
      success: true,
      message: 'Product Added Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductControllers = {
  createProduct,
};
