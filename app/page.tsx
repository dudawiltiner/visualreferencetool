import { CompanyContentGenerator } from '@molecules/AI/CompanyContentGenerator/CompanyContentGenerator';
import { DashboardContent } from '@organisms/Dashboard/DashboardContent/DashboardContent';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <CompanyContentGenerator />
      </div>
      <DashboardContent />
    </div>
  );
}
