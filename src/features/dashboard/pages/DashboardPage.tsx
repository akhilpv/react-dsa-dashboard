import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import DashboardStatGrid from '../../../components/molecules/DashboardStatGrid';
import { ExpiringProductsPanel } from '../../../components/organisms/ExpiringProductsPanel';
import { LowStockAlert } from '../../../components/organisms/LowStockAlert';
import { ExpiryAlert } from '../../../components/organisms/ExpiryAlert';
import { TopSellers } from '../../../components/organisms/TopSellers';
import { ProductStockRange } from '../../../components/organisms/ProductStockRange';
const Dashboard = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const now = new Date();
  const in7Days = new Date();
  in7Days.setDate(now.getDate() + 7);

  const expiring = products.filter((p) => new Date(p.expiryDate) < in7Days);
  const inStock = products.filter((p) => p.status === 'in-stock').length;
  const outOfStock = products.filter((p) => p.status === 'out-of-stock').length;

  const stats = {
    total: products.length,
    inStock,
    outOfStock,
    expiring: expiring.length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardStatGrid stats={stats} />
      <ExpiringProductsPanel/>
      <ProductStockRange/>
      <LowStockAlert/>
      <ExpiryAlert/>
      <TopSellers/>
    </div>
  );
};

export default Dashboard;