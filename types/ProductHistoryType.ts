export default interface ProductHistory {
  quantity: number;
  price_at_order: number;
  orders: {
    order_date: string;
  };
}