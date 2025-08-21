import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categories/slices/categorySlice";
import { addProduct } from "../../features/products/slices/productSlice";
import { topologicalSort } from "../../utils/dependencySorter";
import type { Product } from "../../features/products/types/product.types";
import type { Category } from "../../features/categories/types/category.types";

export const BulkImport = () => {
  const dispatch = useDispatch();

  const handleBulkImport = () => {
    const categories: Category[] = [
    { id: 1, name: "Medicines" },
    { id: 2, name: "Painkillers", parentId: 1 },
    { id: 3, name: "Antibiotics", parentId: 1 },
    { id: 4, name: "Cough Syrups", parentId: 1 },
    ];

    const products: Product[] = [
      {
      id: 101,
      name: "Paracetamol",
      price: 25,
      sku: "P001",
      status: "active",
      stock: 200,
      category: 2, // depends on Painkillers
      expiryDate: "2026-05-01",
    },
    {
      id: 102,
      name: "Amoxicillin",
      price: 80,
      sku: "A002",
      status: "active",
      stock: 150,
      category: 3, // depends on Antibiotics
      expiryDate: "2026-07-15",
    },
    {
      id: 103,
      name: "Cough Syrup",
      price: 120,
      sku: "C003",
      status: "active",
      stock: 90,
      category: 4, // depends on Cough Syrups
      expiryDate: "2025-12-31",
    },
    {
      id: 104,
      name: "Multivitamins",
      price: 60,
      sku: "M004",
      status: "active",
      stock: 300,
      category: 1, // depends directly on Medicines
      expiryDate: "2027-01-01",
    },
    ];

    // Merge into dependency nodes
    const nodes = [
      ...categories.map((c) => ({
        type: "category" as const,
        id: c.id,
        data: c,
      })),
      ...products.map((p) => ({
        type: "product" as const,
        id: p.id,
        data: p,
        dependsOn: p.category,
      })),
    ];

    const sortedNodes = topologicalSort(nodes);

    sortedNodes.forEach((node) => {
      if (node.type === "category") {
        dispatch(addCategory(node.data as Category));
      } else {
        dispatch(addProduct(node.data as Product));
      }
    });

    console.log("Bulk import done in topological order ✅");
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleBulkImport}
      >
        Bulk Import (Topological Sort)
      </button>
    </div>
  );
};