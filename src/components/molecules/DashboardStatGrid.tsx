import StatCard from '../atoms/StatCard';
import { Box, PackageCheck, AlertTriangle } from 'lucide-react';

const DashboardStatGrid = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Products" value={stats.total} icon={<Box />} />
      <StatCard label="In Stock" value={stats.inStock} icon={<PackageCheck />} color="bg-green-50" />
      <StatCard label="Out of Stock" value={stats.outOfStock} icon={<AlertTriangle />} color="bg-red-50" />
      <StatCard label="Expiring Soon" value={stats.expiring} icon={<AlertTriangle />} color="bg-yellow-50" />
    </div>
  );
};

export default DashboardStatGrid;