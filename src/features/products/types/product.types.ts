export interface Product {
  id: number;
  name: string;
  sku: string;
  status: 'out-of-stock' | 'in-stock';  
  stock: number;
  price: number;
  category: string; 
}
