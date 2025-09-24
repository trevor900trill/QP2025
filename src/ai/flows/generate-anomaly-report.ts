'use server';

/**
 * @fileOverview A flow to generate a report highlighting potential data anomalies in payroll data.
 *
 * - generateAnomalyReport - A function that handles the anomaly report generation process.
 * - GenerateAnomalyReportInput - The input type for the generateAnomalyReport function.
 * - GenerateAnomalyReportOutput - The return type for the generateAnomalyReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnomalyReportInputSchema = z.object({
  payrollData: z
    .string()
    .describe('Payroll data in JSON format.'),
});
export type GenerateAnomalyReportInput = z.infer<typeof GenerateAnomalyReportInputSchema>;

const GenerateAnomalyReportOutputSchema = z.object({
  report: z.string().describe('A report highlighting potential data anomalies.'),
});
export type GenerateAnomalyReportOutput = z.infer<typeof GenerateAnomalyReportOutputSchema>;

export async function generateAnomalyReport(input: GenerateAnomalyReportInput): Promise<GenerateAnomalyReportOutput> {
  return generateAnomalyReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnomalyReportPrompt',
  input: {schema: GenerateAnomalyReportInputSchema},
  output: {schema: GenerateAnomalyReportOutputSchema},
  prompt: `You are an AI assistant specializing in identifying anomalies in payroll data.

  Analyze the following payroll data and generate a report that highlights potential anomalies such as unusual salary changes, unexpected benefits, or any other inconsistencies that might require manual review.

  Payroll Data: {{{payrollData}}}

  Report Format:
  - Briefly describe each anomaly.
  - Explain why it is considered an anomaly.
  - Suggest potential reasons for the anomaly.
  - Recommend actions for manual review.
  `,
});

const generateAnomalyReportFlow = ai.defineFlow(
  {
    name: 'generateAnomalyReportFlow',
    inputSchema: GenerateAnomalyReportInputSchema,
    outputSchema: GenerateAnomalyReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
