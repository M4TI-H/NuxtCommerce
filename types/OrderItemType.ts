export default interface OrderItem {
  product_id: number | undefined,
  name: string,
  quantity: number,
  price: number,
  total: number
}
