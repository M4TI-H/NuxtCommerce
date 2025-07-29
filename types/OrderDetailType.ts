export default interface OrderDetail {
  product_id: number;
  order_id: number;
  quantity: number;
  price_at_order: number;
  user_id: string;
}