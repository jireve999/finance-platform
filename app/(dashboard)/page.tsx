import { Suspense } from 'react';
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

export default function DashboardPage() {

  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-screen-2xl mx-auto w-fll pb-10 -mt-24">
        <DataGrid />
        <DataCharts />
      </div>
    </Suspense>
  );
}
