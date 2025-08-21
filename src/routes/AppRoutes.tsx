import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchPage from '../features/search/pages/SearchPage';
import UndoRedoTab from '../features/products/pages/UndoRedoPage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
import Dashboard from '../features/dashboard/pages/DashboardPage';
import { BudgetProductPage } from '../features/products/pages/BudgetProductPage';
import { FilteredProductList } from '../features/products/pages/FilteredProductList';
import { ProductSearchPage } from '../features/search/pages/ProductSearchPage';
import CategoryPage from '../features/categories/pages/CategoryPage';
import { CategorySearchPage } from '../features/categories/pages/CategorySearchPage';
import { RelatedProductPage } from '../features/products/pages/RelatedProductPage';
import { CategoryGroupingPage } from '../features/categories/pages/CategoryGroupingPage';
import { UniqueProductsPage } from '../features/products/pages/UniqueProductsPage';
import DiscountPage from '../features/discounts/pages/DiscountPage';
import ProductFormPage from '../features/products/pages/ProductFormPage';
import ProductCarouselPage from '../features/products/pages/ProductCarouselPage';
import ProductSearchPageV1 from '../features/products/pages/ProductSearchPage';
import CategoryDFSPage from '../features/categories/pages/CategoryDFSPage';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="undo" element={<UndoRedoTab />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/products/filtered" element={<FilteredProductList />} />
      <Route path="/budget-products" element={<BudgetProductPage />} />
      <Route path="/search-products" element={<ProductSearchPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/categories-search" element={<CategorySearchPage />} />
      <Route path="/categories-group" element={<CategoryGroupingPage />} />
      <Route path="/categories-dfs" element={<CategoryDFSPage />} />
      <Route path="/related-products" element={<RelatedProductPage />} />
      <Route path="/unique-products" element={<UniqueProductsPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="/discounts" element={<DiscountPage />} />
      <Route path="/add-product" element={<ProductFormPage />} />
      <Route path="/product-carousel" element={<ProductCarouselPage />} />
      <Route path="/product-search" element={<ProductSearchPageV1 />} />
    </Route>
  </Routes>
);

export default AppRoutes;