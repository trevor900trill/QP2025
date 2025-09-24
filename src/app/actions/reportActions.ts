"use server";

import { generateAnomalyReport } from "@/ai/flows/generate-anomaly-report";

export async function getAnomalyReport(payrollData: string) {
  try {
    const result = await generateAnomalyReport({ payrollData });
    return { success: true, report: result.report };
  } catch (error) {
    console.error("Error generating anomaly report:", error);
    return { success: false, error: "Failed to generate report. Please try again." };
  }
}
