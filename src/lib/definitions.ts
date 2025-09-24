export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Employee' | 'Manager';
  status: 'Active' | 'Pending' | 'Inactive';
};

export type Company = {
  id: string;
  name: string;
  pin: string;
  nssf: string;
  nhif: string;
  logoUrl: string;
  employeeCount: number;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  grossPay: number;
  status: 'Active' | 'Onboarding' | 'Terminated';
  companyId: string;
  avatar: string;
};

export type Payslip = {
  id: string;
  period: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  fileUrl: string;
};

export type Report = {
  id: string;
  name: string;
  description: string;
  type: 'CSV' | 'PDF';
  createdAt: string;
};
