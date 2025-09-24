import Link from 'next/link';
import { FileText, Download, BrainCircuit } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { reports } from '@/lib/placeholder-data';

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and download various payroll and compliance reports."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/reports/anomaly-detection">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                <span>AI Anomaly Detection</span>
              </CardTitle>
              <CardDescription>
                Use AI to analyze payroll data and flag potential anomalies for manual review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>
        </Link>
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>{report.name}</span>
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download {report.type}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
