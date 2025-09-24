"use client";

import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatedPageHeader } from '@/components/shared/AnimatedPageHeader';

const reportLinks = [
    { id: 'REP001', name: 'P9 Report', description: 'Annual tax deduction report for employees.', href: '/admin/reports/p9' },
    { id: 'REP002', name: 'NHIF By-Product', description: 'Monthly National Hospital Insurance Fund contributions.', href: '/admin/payroll' },
    { id: 'REP003', name: 'NSSF Report', description: 'Monthly National Social Security Fund contributions.', href: '/admin/payroll' },
    { id: 'REP004', name: 'Bank Payroll Summary', description: 'Summary of net pay for bank transfers.', href: '/admin/payroll' },
]

export default function ReportsPage() {
  return (
    <>
      <AnimatedPageHeader
        title="Reports"
        icon={FileText}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportLinks.map((report) => (
          <Link href={report.href} key={report.id}>
            <Card className="h-full hover:border-primary transition-colors group">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className='flex items-center gap-4'>
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                        <CardTitle>
                            {report.name}
                        </CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
