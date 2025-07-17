import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchPage from '../features/search/pages/SearchPage';
import UndoRedoTab from '../features/products/pages/UndoRedoPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/undo" />} />
      <Route path="undo" element={<UndoRedoTab />} />
      <Route path="search" element={<SearchPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;