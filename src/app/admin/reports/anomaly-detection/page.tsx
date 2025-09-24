"use client";

import { useState } from 'react';
import { BrainCircuit, Loader2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnomalyReport } from '@/app/actions/reportActions';
import { mockPayrollJson } from '@/lib/placeholder-data';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AnomalyDetectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setReport(null);
    setError(null);
    const result = await getAnomalyReport(mockPayrollJson);
    if (result.success) {
      setReport(result.report);
    } else {
      setError(result.error ?? "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <PageHeader
        title="AI Anomaly Detection"
        description="Let AI analyze your payroll data and highlight potential issues."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Data</CardTitle>
            <CardDescription>
              This is the sample payroll data that will be sent for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md text-xs overflow-x-auto font-code">
              <code>{mockPayrollJson}</code>
            </pre>
            <Button onClick={handleGenerateReport} disabled={isLoading} className="w-full mt-4">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Generate Anomaly Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Report</CardTitle>
            <CardDescription>
              Potential anomalies will be displayed here after analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is analyzing the data...</p>
              </div>
            )}
            {error && (
               <Alert variant="destructive">
                 <AlertTriangle className="h-4 w-4" />
                 <AlertTitle>Error</AlertTitle>
                 <AlertDescription>{error}</AlertDescription>
               </Alert>
            )}
            {report && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans">
                {report}
              </div>
            )}
            {!isLoading && !report && !error && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <p>Click the button to generate your report.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
