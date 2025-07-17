import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, undo, redo } from '../slices/productSlice';
import { useToastQueue } from '../../notifications/hooks/useToastQueue';
import type { RootState } from '../../../app/store';

const UndoRedoPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<'in_stock' | 'out_of_stock'>('in_stock');
  const [stock, setStock] = useState('');
  const dispatch = useDispatch();
  const showToast = useToastQueue();
  
  const products = useSelector((state: RootState) => state.products.products);

  const handleAdd = () => {
    if (!name || !price || !sku || !stock) {
      showToast('Please fill all fields', 'error', 'Add Product');
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
    })
  );

  showToast(`Added "${name}" successfully`, 'success', 'Add Product');

  setName('');
  setPrice('');
  setSku('');
  setStock('');
  setStatus('in_stock');
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
              <strong>{p.name}</strong> (SKU: {p.sku})<br />
              <span>Status: {p.status}</span> | <span>Stock: {p.stock}</span>
            </div>
            <span className="text-right font-medium">${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UndoRedoPage;