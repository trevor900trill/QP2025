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

export type Address = {
  country: string;
  address: string;
  postCode: string;
  city: string;
  mobileNumber: string;
  personalEmail: string;
};

export type KRADetail = {
  employeePIN: string;
  employeeNSSF: string;
  employeeNHIF: string;
};

export type EmployeeWorkDetails = {
  workId: string;
  workEmail: string;
  dateOfEmployment: string;
  isTerminated: boolean;
  terminationDate?: string;
  terminationComments?: string;
};

export type EmployeePersonalDetail = {
  maritalStatus: string;
  levelOfEducation: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  spouseName?: string;
};

export type EmployeeReferee = {
  names: string;
  email: string;
  phoneNumber: string;
};

export type EmployeeBanking = {
  bankId: string;
  accountName: string;
  accountNumber: string;
  remarks?: string;
};

export type EmploymentTypeSetting = {
  deductNHIF: boolean;
  deductNSSF: boolean;
  deductHousingLevy: boolean;
  isResident: boolean;
  employmentTypeId: string;
};

export type Employee = {
  id: string; // Existing, can be used for internal ID
  selfOnboardRecipientEmail: string;
  companyId: string;
  departmentId: string; // Assuming it's a string ID now
  employmentTypeId: string;
  title: string;
  firstName: string;
  middleName?: string;
  surname: string;
  dob: string;
  gender: string;
  idNumber: string;
  nationality: string;
  passportNumber?: string;
  grossPayKES: number;
  currencyName: string;
  convertionRate: number; // conversionRate is misspelled in schema
  importanceRank: number;
  isDepartmentHead: boolean;
  address: Address;
  kraDetail: KRADetail;
  employeeWorkDetails: EmployeeWorkDetails;
  employeePersonalDetail: EmployeePersonalDetail;
  employeeReferee: EmployeeReferee;
  employeeBanking: EmployeeBanking;
  employmentTypeSetting: EmploymentTypeSetting;
  
  // Properties from old schema for compatibility if needed
  name: string;
  email: string;
  department: string;
  role: string;
  grossPay: number;
  status: 'Active' | 'Onboarding' | 'Terminated';
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
