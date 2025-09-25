"use client"

import * as React from "react"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  Landmark,
  FileText,
  Heart,
  Users as UsersIcon,
  Phone,
  Mail,
  Calendar,
  Wallet,
  Building,
} from "lucide-react"

import { employees } from "@/lib/placeholder-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Employee } from "@/lib/definitions"

const InfoPill = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | React.ReactNode
}) =>
  value ? (
    <div className="flex items-start gap-4">
      <Icon className="h-5 w-5 text-muted-foreground mt-1" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  ) : null

const DetailSection = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        {React.createElement(icon, { className: "h-5 w-5" })}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
)

export default function EmployeeDetailsPage() {
  const params = useParams()
  const employee = employees.find(e => e.id === params.employeeId) as Employee | undefined

  if (!employee) {
    notFound()
  }

  return (
    <>
      <div className="mb-4">
        <Button variant="link" asChild className="px-0">
          <Link href="/admin/onboarding/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
      </div>

      <header className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>
            {employee.firstName?.[0]}
            {employee.surname?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{`${employee.firstName} ${employee.surname}`}</h1>
          <p className="text-muted-foreground">{employee.title}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{employee.department}</Badge>
            <Badge
              variant={
                employee.status === "Active"
                  ? "default"
                  : employee.status === "Onboarding"
                  ? "secondary"
                  : "destructive"
              }
            >
              {employee.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-1 flex flex-col gap-6">
           <DetailSection title="Personal Information" icon={User}>
                <InfoPill label="Full Name" value={`${employee.firstName} ${employee.middleName || ''} ${employee.surname}`} />
                <InfoPill label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
                <InfoPill label="Gender" value={employee.gender} />
                <InfoPill label="Nationality" value={employee.nationality} />
                <InfoPill label="ID Number" value={employee.idNumber} />
                {employee.passportNumber && <InfoPill label="Passport Number" value={employee.passportNumber} />}
           </DetailSection>
            <DetailSection title="Contact Details" icon={Phone}>
                <InfoPill label="Personal Email" value={<a href={`mailto:${employee.address.personalEmail}`} className="text-primary hover:underline">{employee.address.personalEmail}</a>} />
                <InfoPill label="Mobile Number" value={employee.address.mobileNumber} />
                <Separator />
                <InfoPill label="Address" value={`${employee.address.address}, ${employee.address.city}, ${employee.address.postCode}, ${employee.address.country}`} />
            </DetailSection>
        </div>

        <div className="xl:col-span-1 flex flex-col gap-6">
            <DetailSection title="Work & Employment" icon={Briefcase}>
                <InfoPill label="Work Email" value={<a href={`mailto:${employee.employeeWorkDetails.workEmail}`} className="text-primary hover:underline">{employee.employeeWorkDetails.workEmail}</a>} />
                <InfoPill label="Date of Employment" value={new Date(employee.employeeWorkDetails.dateOfEmployment).toLocaleDateString()} />
                <InfoPill label="Department" value={employee.department} />
                <InfoPill label="Employment Type" value={employee.employmentTypeId} />
                 <InfoPill label="Department Head" value={employee.isDepartmentHead ? 'Yes' : 'No'} />
            </DetailSection>

             <DetailSection title="Statutory Details" icon={FileText}>
                <InfoPill label="KRA PIN" value={employee.kraDetail.employeePIN} />
                <InfoPill label="NSSF Number" value={employee.kraDetail.employeeNSSF} />
                <InfoPill label="NHIF Number" value={employee.kraDetail.employeeNHIF} />
            </DetailSection>
        </div>

         <div className="xl:col-span-1 flex flex-col gap-6">
            <DetailSection title="Financials" icon={Wallet}>
                <InfoPill label="Gross Pay (KES)" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES' }).format(employee.grossPayKES)} />
                <InfoPill label="Bank" value={employee.employeeBanking.bankId} />
                <InfoPill label="Account Name" value={employee.employeeBanking.accountName} />
                <InfoPill label="Account Number" value={employee.employeeBanking.accountNumber} />
            </DetailSection>
            
            <DetailSection title="Additional Details" icon={UsersIcon}>
                <InfoPill label="Marital Status" value={employee.employeePersonalDetail.maritalStatus} />
                 <InfoPill label="Education Level" value={employee.employeePersonalDetail.levelOfEducation} />
                 <Separator />
                 <p className="font-medium text-sm">Emergency Contact</p>
                 <InfoPill label="Name" value={employee.employeePersonalDetail.emergencyContactName} />
                 <InfoPill label="Phone" value={employee.employeePersonalDetail.emergencyContactPhone} />
                 <Separator />
                 <p className="font-medium text-sm">Referee</p>
                 <InfoPill label="Name" value={employee.employeeReferee.names} />
                 <InfoPill label="Email" value={employee.employeeReferee.email} />
                 <InfoPill label="Phone" value={employee.employeeReferee.phoneNumber} />
            </DetailSection>
        </div>
      </div>
    </>
  )
}
