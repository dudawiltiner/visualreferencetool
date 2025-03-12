import { CompanyContentGenerator } from '@molecules/AI/CompanyContentGenerator/CompanyContentGenerator';
import { DashboardStats } from '@organisms/Dashboard/DashboardStats/DashboardStats';
import { RecentItems } from '@organisms/Dashboard/RecentItems/RecentItems';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <CompanyContentGenerator />
      </div>
      <DashboardStats />
      <RecentItems />
    </div>
  );
}
