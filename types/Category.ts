import { TImage } from "./Image";

export interface Category {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImageURL: TImage;
  categoryStatus: string;
  createdAt: string;
  updatedAt: string;
}
