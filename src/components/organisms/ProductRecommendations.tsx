import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { bfsRecommendations } from "../../utils/bfsRecommendations";
import type { Graph } from "../../utils/bfsRecommendations";
import { useNavigate } from "react-router-dom";

type Props = {
  productId: string;
};

export const ProductRecommendations: React.FC<Props> = ({ productId }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const navigate = useNavigate();

  const productGraph: Graph = React.useMemo(() => {
    const graph: Graph = {};
    products.forEach((p) => {
      graph[p.id] = p.relatedProducts || []; 
    });
    return graph;
  }, [products]);

  const recommendedIds = React.useMemo(() => {
    return bfsRecommendations(productGraph, productId, 2); 
  }, [productGraph, productId]);

  const recommendedProducts = products.filter((p) =>
    recommendedIds.includes(p.id)
  );

  if (!recommendedProducts.length) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">You may also like</h2>
      <div className="grid grid-cols-2 gap-4">
        {recommendedProducts.map((p) => (
          <div
            key={p.id}
            className="border p-3 rounded cursor-pointer hover:shadow"
            onClick={() => navigate(`/products/${p.id}`)}
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">
              Price: ₹{p.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
