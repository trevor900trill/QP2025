"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, UsersRound, FilePenLine, User as UserIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import type { Employee } from "@/lib/definitions";
import { employees as initialEmployees, companies } from "@/lib/placeholder-data";
import { useCompany } from "@/context/CompanyContext";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedPageHeader } from "@/components/shared/AnimatedPageHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  postCode: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  personalEmail: z.string().email("Invalid email"),
});

const employeeSchema = z.object({
  selfOnboardRecipientEmail: z.string().email(),
  companyId: z.string().min(1),
  departmentId: z.string().min(1),
  employmentTypeId: z.string().min(1),
  title: z.string().min(2),
  firstName: z.string().min(2),
  middleName: z.string().optional(),
  surname: z.string().min(2),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1),
  idNumber: z.string().min(1),
  nationality: z.string().min(1),
  passportNumber: z.string().optional(),
  grossPayKES: z.coerce.number().positive(),
  currencyName: z.string().min(3),
  convertionRate: z.coerce.number().positive(),
  importanceRank: z.coerce.number().min(1),
  isDepartmentHead: z.boolean().default(false),
  address: addressSchema,
  kraDetail: z.object({
    employeePIN: z.string().min(1),
    employeeNSSF: z.string().min(1),
    employeeNHIF: z.string().min(1),
  }),
  employeeWorkDetails: z.object({
    workId: z.string().optional(),
    workEmail: z.string().email(),
    dateOfEmployment: z.string().min(1),
    isTerminated: z.boolean().default(false),
  }),
  employeePersonalDetail: z.object({
    maritalStatus: z.string().min(1),
    levelOfEducation: z.string().min(1),
    emergencyContactName: z.string().min(1),
    emergencyContactPhone: z.string().min(1),
    spouseName: z.string().optional(),
  }),
  employeeReferee: z.object({
    names: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(1),
  }),
  employeeBanking: z.object({
    bankId: z.string().min(1),
    accountName: z.string().min(1),
    accountNumber: z.string().min(1),
    remarks: z.string().optional(),
  }),
  employmentTypeSetting: z.object({
    deductNHIF: z.boolean().default(true),
    deductNSSF: z.boolean().default(true),
    deductHousingLevy: z.boolean().default(true),
    isResident: z.boolean().default(true),
    employmentTypeId: z.string().min(1),
  }),
});


const steps = [
    { id: 'Step 1', name: 'Basic Information' },
    { id: 'Step 2', name: 'Personal Details' },
    { id: 'Step 3', name: 'Statutory & Work' },
    { id: 'Step 4', name: 'Financials' },
    { id: 'Step 5', name: 'Other Details' },
]

export default function EmployeesPage() {
  const { selectedCompany } = useCompany();
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees);
  const [isAddFormOpen, setIsAddFormOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const { toast } = useToast();

  const filteredEmployees = React.useMemo(() => {
    if (!selectedCompany) return employees;
    return employees.filter(emp => emp.companyId === selectedCompany.id);
  }, [selectedCompany, employees]);
  
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      companyId: selectedCompany?.id || companies[0].id,
      selfOnboardRecipientEmail: "",
      departmentId: "",
      employmentTypeId: "",
      title: "",
      firstName: "",
      surname: "",
      dob: "",
      gender: "",
      idNumber: "",
      nationality: "",
      grossPayKES: 0,
      currencyName: "KES",
      convertionRate: 1,
      importanceRank: 5,
      isDepartmentHead: false,
      address: {
        country: "",
        address: "",
        postCode: "",
        city: "",
        mobileNumber: "",
        personalEmail: "",
      },
      kraDetail: {
        employeePIN: "",
        employeeNSSF: "",
        employeeNHIF: "",
      },
      employeeWorkDetails: {
        workEmail: "",
        dateOfEmployment: "",
        isTerminated: false,
      },
      employeePersonalDetail: {
        maritalStatus: "",
        levelOfEducation: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
      },
      employeeReferee: {
        names: "",
        email: "",
        phoneNumber: "",
      },
      employeeBanking: {
        bankId: "",
        accountName: "",
        accountNumber: "",
      },
      employmentTypeSetting: {
        deductNHIF: true,
        deductNSSF: true,
        deductHousingLevy: true,
        isResident: true,
        employmentTypeId: "",
      },
    },
  });

  React.useEffect(() => {
    if (selectedCompany) {
      form.setValue('companyId', selectedCompany.id);
    }
  }, [form, selectedCompany]);
  
  const closeForm = () => {
    setIsAddFormOpen(false);
    form.reset();
    setCurrentStep(0);
  };

  const onSubmit = (data: z.infer<typeof employeeSchema>) => {
    const newEmployee: Employee = {
      id: `E${String(employees.length + 1).padStart(3, '0')}`,
      email: data.selfOnboardRecipientEmail,
      name: `${data.firstName} ${data.surname}`,
      department: data.departmentId, // This might need a lookup
      role: data.title,
      grossPay: data.grossPayKES,
      status: 'Onboarding',
      avatar: `https://i.pravatar.cc/150?u=${employees.length + 20}`,
      ...data
    };
    setEmployees([newEmployee, ...employees]);
    toast({ title: "Employee Added", description: `${newEmployee.name} has been added to onboarding.` });
    closeForm();
  };

  const nextStep = () => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));


  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={employee.avatar}
              alt={employee.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-muted-foreground">{employee.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "grossPay",
      header: "Gross Pay",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("grossPay"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "KES",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant: "default" | "secondary" | "destructive" =
          status === "Active" ? "default" : status === "Onboarding" ? "secondary" : "destructive";
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/onboarding/employees/${employee.id}`}>
                    <FilePenLine className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href={`/admin/onboarding/employees/${employee.id}/details`}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Employee Details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];

  const actionButton = (
    <Button onClick={() => setIsAddFormOpen(true)}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Employee
    </Button>
  );

  return (
    <>
      <AnimatedPageHeader title="Employees" icon={UsersRound} iconAnimation="breathe" />
      <Card>
        <DataTable 
            columns={columns} 
            data={filteredEmployees} 
            searchKey="name"
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            actionButton={actionButton}
        />
      </Card>
       <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <DialogContent className="max-w-3xl" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeForm}>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
             <div className="pt-4">
                <ol className="flex items-center w-full">
                    {steps.map((step, index) => (
                        <li key={step.id} className="flex w-full items-center">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    {index + 1}
                                </div>
                                <p className={`ml-2 text-sm font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
                            </div>
                            {index < steps.length - 1 && <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-muted mx-4"></div>}
                        </li>
                    ))}
                </ol>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
                {currentStep === 0 && (
                    <div className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-3 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Jane" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="middleName" render={({ field }) => (
                            <FormItem><FormLabel>Middle Name</FormLabel><FormControl><Input placeholder="M." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="surname" render={({ field }) => (
                            <FormItem><FormLabel>Surname</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                        <FormField control={form.control} name="selfOnboardRecipientEmail" render={({ field }) => (
                        <FormItem><FormLabel>Onboarding Email</FormLabel><FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                        <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="departmentId" render={({ field }) => (
                            <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="employmentTypeId" render={({ field }) => (
                            <FormItem><FormLabel>Employment Type</FormLabel><FormControl><Input placeholder="Full-Time" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="dob" render={({ field }) => (
                                <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="gender" render={({ field }) => (
                                <FormItem><FormLabel>Gender</FormLabel><FormControl><Input placeholder="Female" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                            <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="idNumber" render={({ field }) => (
                                <FormItem><FormLabel>ID Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="nationality" render={({ field }) => (
                                <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input placeholder="Kenyan" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                            <FormField control={form.control} name="passportNumber" render={({ field }) => (
                            <FormItem><FormLabel>Passport Number (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                            <Separator />
                            <FormField control={form.control} name="address.personalEmail" render={({ field }) => (
                            <FormItem><FormLabel>Personal Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="address.mobileNumber" render={({ field }) => (
                            <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                            <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="address.address" render={({ field }) => (
                                <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="address.city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="address.postCode" render={({ field }) => (
                                <FormItem><FormLabel>Post Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="address.country" render={({ field }) => (
                                <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                    </div>
                )}
                 {currentStep === 2 && (
                    <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                            <FormField control={form.control} name="kraDetail.employeePIN" render={({ field }) => (
                                <FormItem><FormLabel>KRA PIN</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="kraDetail.employeeNSSF" render={({ field }) => (
                                <FormItem><FormLabel>NSSF No.</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="kraDetail.employeeNHIF" render={({ field }) => (
                                <FormItem><FormLabel>NHIF No.</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="employeeWorkDetails.workEmail" render={({ field }) => (
                                <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                                <FormField control={form.control} name="employeeWorkDetails.dateOfEmployment" render={({ field }) => (
                                <FormItem><FormLabel>Employment Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                            <FormField control={form.control} name="employmentTypeSetting.isResident" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none"><FormLabel>Is Resident?</FormLabel></div>
                            </FormItem>
                        )} />
                    </div>
                )}
                {currentStep === 3 && (
                     <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                                <FormField control={form.control} name="grossPayKES" render={({ field }) => (
                                <FormItem><FormLabel>Gross Pay</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="currencyName" render={({ field }) => (
                                <FormItem><FormLabel>Currency</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="convertionRate" render={({ field }) => (
                                <FormItem><FormLabel>Conversion Rate</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <Separator />
                            <div className="grid grid-cols-3 gap-4">
                            <FormField control={form.control} name="employeeBanking.bankId" render={({ field }) => (
                                <FormItem><FormLabel>Bank</FormLabel><FormControl><Input placeholder="e.g. KCB" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeeBanking.accountName" render={({ field }) => (
                                <FormItem><FormLabel>Account Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeeBanking.accountNumber" render={({ field }) => (
                                <FormItem><FormLabel>Account Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                    </div>
                )}
                {currentStep === 4 && (
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="employeePersonalDetail.maritalStatus" render={({ field }) => (
                                <FormItem><FormLabel>Marital Status</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeePersonalDetail.levelOfEducation" render={({ field }) => (
                                <FormItem><FormLabel>Level of Education</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <Separator />
                        <p className="font-medium text-sm">Emergency Contact</p>
                            <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="employeePersonalDetail.emergencyContactName" render={({ field }) => (
                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeePersonalDetail.emergencyContactPhone" render={({ field }) => (
                                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                            <Separator />
                        <p className="font-medium text-sm">Referee</p>
                            <div className="grid grid-cols-3 gap-4">
                            <FormField control={form.control} name="employeeReferee.names" render={({ field }) => (
                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeeReferee.email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="employeeReferee.phoneNumber" render={({ field }) => (
                                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                    </div>
                )}
            </form>
          </Form>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
            <div className="flex-grow" />
            {currentStep > 0 && <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>}
            {currentStep < steps.length - 1 && <Button type="button" onClick={nextStep}>Next</Button>}
            {currentStep === steps.length - 1 && <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save Employee</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
