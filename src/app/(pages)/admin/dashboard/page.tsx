import { Metadata } from 'next';
import { httpServerApi } from '@/api-base';
import { IdeaServiceIds } from '@/api-base/services/idea-services';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Briefcase, FileText } from 'lucide-react';
import { GetSummaryResponseType } from '@/types/IdeaTypes';
import DashboardCard from './components/DashboardCard';

export const metadata: Metadata = {
  title: 'Dashboard',
};

async function DashboardPage() {
  const res = await (
    await httpServerApi()
  ).execService({
    id: IdeaServiceIds.GetSummary,
  });

  if (!res.ok) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Lỗi khi lấy ý tưởng công khai</AlertTitle>
      </Alert>
    );
  }

  const summary = res.data as GetSummaryResponseType;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <DashboardCard
          title="Tổng ý tưởng"
          value={summary.totalIdeas.toString()}
          description="Chưa bao gồm bài chưa xét duyệt"
          icon={<FileText className="w-6 h-6 text-white" />}
          iconBgColor="bg-yellow-400"
          accentColor="border-b-yellow-200"
        />
        <DashboardCard
          title="Nhà đầu tư"
          value={summary.totalInvestors.toString()}
          description="Tài khoản có vai trò Nhà đầu tư"
          icon={<Briefcase className="w-6 h-6 text-white" />}
          iconBgColor="bg-blue-500"
          accentColor="bg-blue-200"
        />
        <DashboardCard
          title="ý tưởng viên"
          value={summary.totalFounders.toString()}
          description="Tài khoản có vai trò Ý tưởng viên"
          icon={<Briefcase className="w-6 h-6 text-white" />}
          iconBgColor="bg-pink-400"
          accentColor="border-b-pink-200"
        />
      </div>
    </div>
  );
}

export default DashboardPage;
