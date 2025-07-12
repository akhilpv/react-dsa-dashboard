import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-auto bg-gray-50 h-full">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;