import type Order from "./OrderType";
import type Product from "./ProductType";
import type { OrderDetails } from "./OrderDetailType";

export default interface Database {
  public: {
    Tables: {
      products: {
        Row: Product,
        Insert: Omit<Product, 'id'>
        Update: Partial<Omit<Product, 'id'>>;
      },
      orders: {
        Row: Order,
        Insert: Omit<Order, 'id'>
      },
      orderDetails: {
        Row: OrderDetails,
        Insert: Omit<OrderDetails, 'id'>
      }
    }
  }
}