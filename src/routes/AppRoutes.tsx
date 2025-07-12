import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchSortTab from '../features/products/pages/SearchSortTab';
import UndoRedoTab from '../features/products/pages/UndoRedoTab';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/undo" />} />
      <Route path="undo" element={<UndoRedoTab />} />
      <Route path="search" element={<SearchSortTab />} />
    </Route>
  </Routes>
);

export default AppRoutes;