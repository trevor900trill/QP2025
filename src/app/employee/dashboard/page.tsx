import { UserCircle, Briefcase, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const employee = {
  name: 'Charlie Brown',
  avatar: 'https://i.pravatar.cc/150?u=3',
  role: 'Software Engineer',
  department: 'Technology',
  joinDate: '2022-08-15',
  email: 'charlie@qwikpace.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, Tech City, 10101',
};

const InfoPill = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-start gap-4">
        <Icon className="h-5 w-5 text-muted-foreground mt-1" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    </div>
);

export default function EmployeeDashboard() {
  return (
    <>
      <PageHeader title="My Dashboard" description="A summary of your personal and employment details." />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <p className="text-muted-foreground">{employee.role}</p>
              <Badge className="mt-2" variant="secondary">{employee.department}</Badge>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCircle className="h-6 w-6" />
                        Profile Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoPill icon={Briefcase} label="Role" value={employee.role} />
                        <InfoPill icon={Briefcase} label="Department" value={employee.department} />
                        <InfoPill icon={Calendar} label="Joining Date" value={new Date(employee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoPill icon={Mail} label="Work Email" value={employee.email} />
                        <InfoPill icon={Phone} label="Phone Number" value={employee.phone} />
                        <InfoPill icon={MapPin} label="Address" value={employee.address} />
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
