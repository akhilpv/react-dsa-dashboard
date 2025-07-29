import React, { useState } from 'react';
import { useExpiringProducts } from '../../features/products/hooks/useExpiringProducts';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns'
export const ExpiringProductsPanel: React.FC = () => {
    const [threshold, setThreshold] = useState<Date>(new Date());
    const expiringProducts = useExpiringProducts(threshold);

    return (
        <section className="space-y-4">
            <header className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">
                    Expiring on / after {format(threshold, 'dd MMM yyyy')}
                </h2>
                <button
                    onClick={() =>
                        setThreshold(
                            new Date(threshold.getFullYear(), threshold.getMonth() + 1, 1)
                        )
                    }
                    className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm"
                >
                    +1 Month
                </button>
            </header>

            {expiringProducts.length === 0 ? (
                <p className="text-gray-500 italic">No products in this range 🎉</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {expiringProducts.map((product) => (
                        <li
                            key={product.id}
                            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
                        >
                            <div className="font-medium text-lg text-gray-800">
                                {product.name}
                            </div>
                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>

                            {product.expiryDate && !isNaN(new Date(product.expiryDate).getTime()) ? (
                                <div className="text-sm">
                                    Exp: {format(new Date(product.expiryDate), 'dd MMM yyyy')}
                                </div>
                            ) : (
                                <div className="text-sm text-red-500">Invalid Date</div>
                            )}
                            <div className="text-sm text-gray-700 font-semibold">
                                ₹{product.price}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};