interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = 'bg-white' }) => {
  return (
    <div className={`p-4 rounded-xl shadow-sm ${color} flex items-center gap-4`}>
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;