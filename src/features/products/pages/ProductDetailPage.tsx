import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../app/store';
import { ProductTabs } from '../../../components/organisms/ProductTabs';
import { useProductTabs } from '../hooks/useProductTabs';
import { ProductCard } from '../../../components/organisms/ProductCard';
import { RecentlyViewedProducts } from '../../../components/molecules/RecentlyViewedProducts';
import { updateRecentlyViewed } from '../../../utils/recentlyViewed';
import { ProductRecommendations } from '../../../components/organisms/ProductRecommendations';
import { addDiscountToProduct } from '../slices/productSlice';
const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'stock', label: 'Stock' },
  { id: 'pricing', label: 'Pricing' },
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { activeTab, changeTab } = useProductTabs(productId || '');
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const products = useSelector((state: RootState) => state.products.products);
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id.toString() === productId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      const updated = updateRecentlyViewed(productId);
      setRecentIds(updated);
    }
  }, [productId]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .sort((a, b) => b.popularity - a.popularity) 
      .slice(0, 4); 
  }, [product, products]);

  if (!product) return <p>Product not found</p>;

  // helper to apply discount
  const handleApplyDiscount = (discount: number) => {
    dispatch(addDiscountToProduct({ productId: product.id, discount }));
  };

  // calculate final price if discount exists
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <ProductTabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={changeTab}
      />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        )}
        {activeTab === 'stock' && (
          <p>
            <strong>Status:</strong> {product.status}
            <br />
            <strong>Stock:</strong> {product.stock}
          </p>
        )}
        {activeTab === 'pricing' && (
          <div>
            <p><strong>Price:</strong> ${product.price}</p>
            {product.discount && (
              <p className="text-green-600 font-semibold">
                Discounted Price: ${discountedPrice} ({product.discount}% OFF)
              </p>
            )}

            {/* Discount Buttons */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleApplyDiscount(10)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Apply 10% Discount
              </button>
              <button
                onClick={() => handleApplyDiscount(25)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Apply 25% Discount
              </button>
              <button
                onClick={() => handleApplyDiscount(50)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Apply 50% Discount
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Discounts Section */}
      {product.discount && (
        <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="text-lg font-semibold">Discounts</h3>
          <p>{product.discount}% OFF applied. Final Price: ${discountedPrice}</p>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}
      <RecentlyViewedProducts productIds={recentIds} currentProductId={productId!} />
      {productId && <ProductRecommendations productId={productId} />}
    </div>
  );
};

export default ProductDetailPage;