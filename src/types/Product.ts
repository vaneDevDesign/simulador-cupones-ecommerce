export type Category = "Clothing" | "Home" | "Electronics";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}
