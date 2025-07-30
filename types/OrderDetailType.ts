export interface OrderDetails {
  product_id: number;
  order_id: number;
  quantity: number;
  price_at_order: number;
  user_id: string;
  products: {
    name: string;
    code: string;
  };
}

export interface NewOrderDetails {
  product_id: number;
  order_id: number;
  quantity: number;
  price_at_order: number;
  user_id: string;
}