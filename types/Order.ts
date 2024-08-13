import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  _id: string;
  orderNumber: string;
  invoiceNumber: string;
  deliveryStatusMessage: string;
  orderedDate: string;
  userId: User;
  products: {
    productId: Product;
    price: number;
  }[];
  totalPrice: number;
}
