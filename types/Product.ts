import { Category } from "./Category";
import { TImage } from "./Image";

export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productSold: number;
  productQuantity: number;
  productCategory: Category;
  productImageUrlList: TImage;
  productOffer: string;
  productStatus: string;
  createdAt: string;
  updatedAt: string;
}
