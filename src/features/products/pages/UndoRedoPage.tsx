import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, undo, redo } from '../slices/productSlice';
import { useToastQueue } from '../../notifications/hooks/useToastQueue';
import type { RootState } from '../../../app/store';
import { Link } from 'react-router-dom';

const UndoRedoPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<'in_stock' | 'out_of_stock'>('in_stock');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const dispatch = useDispatch();
  const showToast = useToastQueue();
  
  const products = useSelector((state: RootState) => state.products.products);
  
  const nameSet = new Set(products.map(p => p.name.toLowerCase()));
  const categories = useSelector((state: RootState) => state.categories.list);
  console.log("categories",categories)
  const handleAdd = () => {
    if (!name || !price || !sku || !stock || !expiryDate) {
      showToast('Please fill all fields', 'error', 'Add Product');
      return;
    }
    if (nameSet.has(name.toLowerCase())) {
      showToast(`"${name}" already exists`, 'error', 'Duplicate Product');
      return;
    }

  dispatch(
    addProduct({
      id: Date.now(),
      name,
      price: parseFloat(price),
      sku,
      status,
      stock: parseInt(stock),
      category, 
      expiryDate,
    })
  );

  showToast(`Added "${name}" successfully`, 'success', 'Add Product');

  setName('');
  setPrice('');
  setSku('');
  setStock('');
  setStatus('in_stock');
  setCategory('');
  setExpiryDate('');
};

  return (
    <div>
      <h2 className="text-lg font-semibold text-indigo-700 mb-4">
        Undo / Redo Stack
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 rounded w-32"
        />
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU"
          className="border p-2 rounded w-32"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'in_stock' | 'out_of_stock')}
          className="border p-2 rounded w-40"
        >
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="border p-2 rounded w-24"
        />
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border p-2 rounded w-40"
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border p-2 rounded w-48"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(undo())}
          className="bg-yellow-500 text-white px-4 py-1 rounded"
        >
          Undo
        </button>
        <button
          onClick={() => dispatch(redo())}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Redo
        </button>
      </div>
      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex justify-between p-2 bg-gray-100 rounded"
          >
            <div>
              <Link to={`/products/${p.id}`} className="text-blue-600 underline">
                <strong>{p.name}</strong> (SKU: {p.sku})
              </Link>
              <br />
              <span>Status: {p.status}</span> | <span>Stock: {p.stock}</span>
              
              <span>Category: {p.category}</span> 
              <span className="text-sm text-gray-600">Expiry: {p.expiryDate}</span>
            </div>
            <span className="text-right font-medium">${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UndoRedoPage;