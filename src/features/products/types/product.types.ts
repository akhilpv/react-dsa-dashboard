export interface Product {
  id: number;
  name: string;
  sku: string;
  status: 'active' | 'inactive';  
  stock: number;
  price: number;
}
