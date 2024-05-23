import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.find({ productId });
  return result;
};
const getSearchProductFromDB = async (query: any) => {
  const result = await ProductModel.find(query);
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.updateOne(
    { productId },
    { isDeleted: true },
  );
  return result;
};

// Update
const updateSingleProductFromDB = async (
  productId: string,
  updateData: Partial<TProduct>,
) => {
  return await ProductModel.findOneAndUpdate({ productId }, updateData, {
    new: true,
  });
};

export const ProductServices = {
  createProductInDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  getSearchProductFromDB,
  updateSingleProductFromDB,
};
