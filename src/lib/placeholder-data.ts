import type { User, Company, Employee, Payslip, Report } from './definitions';

export const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@qwikpace.com', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Williams', email: 'bob@qwikpace.com', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Manager', status: 'Active' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@qwikpace.com', avatar: 'https://i.pravatar.cc/150?u=3', role: 'Employee', status: 'Pending' },
  { id: '4', name: 'Diana Miller', email: 'diana@qwikpace.com', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Employee', status: 'Inactive' },
  { id: '5', name: 'Ethan Davis', email: 'ethan@qwikpace.com', avatar: 'https://i.pravatar.cc/150?u=5', role: 'Admin', status: 'Active' },
];

export const companies: Company[] = [
  { id: 'C001', name: 'Innovate Inc.', pin: 'A12345678B', nssf: 'NSSF001', nhif: 'NHIF001', logoUrl: '/logo.svg', employeeCount: 150 },
  { id: 'C002', name: 'Synergy Solutions', pin: 'C98765432D', nssf: 'NSSF002', nhif: 'NHIF002', logoUrl: '/logo.svg', employeeCount: 75 },
  { id: 'C003', name: 'Quantum Leap', pin: 'E54321678F', nssf: 'NSSF003', nhif: 'NHIF003', logoUrl: '/logo.svg', employeeCount: 300 },
];

export const employees: Employee[] = [
  { id: 'E001', name: 'Frank Green', email: 'frank@innovate.com', department: 'Engineering', role: 'Software Engineer', grossPay: 120000, status: 'Active', companyId: 'C001', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 'E002', name: 'Grace Hall', email: 'grace@innovate.com', department: 'Marketing', role: 'Marketing Manager', grossPay: 150000, status: 'Active', companyId: 'C001', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 'E003', name: 'Henry King', email: 'henry@synergy.com', department: 'Sales', role: 'Sales Executive', grossPay: 95000, status: 'Onboarding', companyId: 'C002', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 'E004', name: 'Ivy Lewis', email: 'ivy@quantum.com', department: 'HR', role: 'HR Specialist', grossPay: 85000, status: 'Active', companyId: 'C003', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 'E005', name: 'Jack Moore', email: 'jack@quantum.com', department: 'Engineering', role: 'Lead Engineer', grossPay: 180000, status: 'Terminated', companyId: 'C003', avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: 'E006', name: 'Kendall Nelson', email: 'kendall@synergy.com', department: 'Operations', role: 'Operations Lead', grossPay: 110000, status: 'Active', companyId: 'C002', avatar: 'https://i.pravatar.cc/150?u=11' },
];

export const payslips: Payslip[] = [
    { id: 'PS001', period: 'July 2024', grossPay: 5000, deductions: 500, netPay: 4500, fileUrl: '#' },
    { id: 'PS002', period: 'June 2024', grossPay: 5000, deductions: 500, netPay: 4500, fileUrl: '#' },
    { id: 'PS003', period: 'May 2024', grossPay: 4800, deductions: 480, netPay: 4320, fileUrl: '#' },
    { id: 'PS004', period: 'April 2024', grossPay: 5000, deductions: 500, netPay: 4500, fileUrl: '#' },
    { id: 'PS005', period: 'March 2024', grossPay: 5000, deductions: 500, netPay: 4500, fileUrl: '#' },
];

export const reports: Report[] = [
    { id: 'REP001', name: 'P9 Report', description: 'Annual tax deduction report for employees.', type: 'PDF', createdAt: '2024-01-15' },
    { id: 'REP002', name: 'NHIF By-Product', description: 'Monthly National Hospital Insurance Fund contributions.', type: 'CSV', createdAt: '2024-07-01' },
    { id: 'REP003', name: 'NSSF Report', description: 'Monthly National Social Security Fund contributions.', type: 'CSV', createdAt: '2024-07-01' },
    { id: 'REP004', name: 'Bank Payroll Summary', description: 'Summary of net pay for bank transfers.', type: 'PDF', createdAt: '2024-07-05' },
];

export const mockPayrollJson = JSON.stringify([
    { "employeeId": "E001", "name": "Frank Green", "baseSalary": 120000, "bonus": 5000, "deductions": 12000, "month": "July" },
    { "employeeId": "E002", "name": "Grace Hall", "baseSalary": 150000, "bonus": 0, "deductions": 15000, "month": "July" },
    { "employeeId": "E003", "name": "Henry King", "baseSalary": 95000, "bonus": 2000, "deductions": 9500, "month": "July" },
    { "employeeId": "E004", "name": "Ivy Lewis", "baseSalary": 850000, "bonus": 10000, "deductions": 85000, "month": "July" },
    { "employeeId": "E005", "name": "Jack Moore", "baseSalary": 18000, "bonus": 0, "deductions": 1800, "month": "July" }
], null, 2);
