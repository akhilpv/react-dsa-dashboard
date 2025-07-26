import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { ProductTabs } from '../../../components/organisms/ProductTabs';
import { useProductTabs } from '../hooks/useProductTabs';

const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'stock', label: 'Stock' },
  { id: 'pricing', label: 'Pricing' },
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { activeTab, changeTab } = useProductTabs(productId || '');
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id.toString() === productId)
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <ProductTabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={changeTab}
      />

      <div className="mt-6">~
        {activeTab === 'overview' && (
          <div>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        )}
        {activeTab === 'stock' && (
          <p><strong>Status:</strong> {product.status}<br /><strong>Stock:</strong> {product.stock}</p>
        )}
        {activeTab === 'pricing' && (
          <p><strong>Price:</strong> ${product.price}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;