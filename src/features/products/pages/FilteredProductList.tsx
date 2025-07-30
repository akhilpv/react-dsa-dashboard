import React, { useMemo, useState } from 'react';
import { binarySearchIndex } from '../../../utils/binarySearchPagination';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { ProductCard } from '../../../components/organisms/ProductCard';
import { Pagination } from '../../../components/molecules/Pagination';
const PRODUCTS_PER_PAGE = 2;

export const FilteredProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const [minPrice, setMinPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => a.price - b.price);
    }, [products]);

    const filteredStartIndex = useMemo(() => {
        return binarySearchIndex(sortedProducts, (p) => p.price >= minPrice);
    }, [sortedProducts, minPrice]);

    useMemo(() => {
        if (filteredStartIndex !== -1) {
            const jumpPage = Math.floor(filteredStartIndex / PRODUCTS_PER_PAGE);
            setCurrentPage(jumpPage);
        }
    }, [filteredStartIndex]);

    const paginatedProducts = useMemo(() => {
        const start = currentPage * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        return sortedProducts.slice(start, end);
    }, [sortedProducts, currentPage]);

    return (
        <div className="space-y-4 p-4">
            <div className="flex gap-3 items-center">
                <label className="text-sm font-medium">Min Price:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="border border-gray-300 px-2 py-1 rounded-md"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                
            </div>
            <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                />
        </div>
    );
};