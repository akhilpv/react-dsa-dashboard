import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchPage from '../features/search/pages/SearchPage';
import UndoRedoTab from '../features/products/pages/UndoRedoPage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
import Dashboard from '../features/dashboard/pages/DashboardPage';
import { BudgetProductPage } from '../features/products/pages/BudgetProductPage';
import { FilteredProductList } from '../features/products/pages/FilteredProductList';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="undo" element={<UndoRedoTab />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/products/filtered" element={<FilteredProductList />} />
      <Route path="/budget-products" element={<BudgetProductPage />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;