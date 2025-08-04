export default interface Product {
  id: number;
  name: string;
  code: string;
  isPublic: boolean;
  price: number;
  availability: number;
  user_id: string;
}