import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, undo, redo } from '../slices/productSlice';
import { useToastQueue } from '../../notifications/hooks/useToastQueue';
import type { RootState } from '../../../app/store';

const UndoRedoTab = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const showToast = useToastQueue();
  const products = useSelector((state: RootState) => state.products.products);

  const handleAdd = () => {
    if (!name || !price) {
      showToast('Please enter both name and price', 'error', 'Add Product');
      return;
    }
    dispatch(
      addProduct({
        id: Date.now(),
        name,
        price: parseFloat(price),
      })
    );
    showToast(`Added "${name}" successfully`, 'success', 'Add Product');
    setName('');
    setPrice('');
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
            <span>{p.name}</span>
            <span>${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UndoRedoTab;