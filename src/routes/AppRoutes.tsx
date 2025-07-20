import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchPage from '../features/search/pages/SearchPage';
import UndoRedoTab from '../features/products/pages/UndoRedoPage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/undo" />} />
      <Route path="undo" element={<UndoRedoTab />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;