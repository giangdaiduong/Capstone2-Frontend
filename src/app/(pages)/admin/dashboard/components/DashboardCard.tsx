import { Card, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  accentColor: string;
}

function DashboardCard({ title, value, description, icon, iconBgColor, accentColor }: DashboardCardProps) {
  return (
    <Card className="relative overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          {/* Icon */}
          <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center`}>{icon}</div>
        </div>

        {/* Decorative triangle in corner */}
        <div
          className={`absolute bottom-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] ${accentColor}`}
        />
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
