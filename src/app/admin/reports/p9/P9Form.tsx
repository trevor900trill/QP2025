"use client"

import Image from "next/image"
import type { Employee, Company } from "@/lib/definitions";
import './p9-style.css';

interface P9FormProps {
    employee: Employee;
    company: Company;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fieldNames = ["basicSalary", "benefitsNonCash", "valueQuarters", "totalGross", "dcrsE1", "dcrsE2", "dcrsE3", "ownerOccupiedInterest", "retirementContribution", "chargeablePay", "taxCharged", "personalRelief", "insuranceRelief", "payeTaxRelief"];

// Mock data generation for one employee
const generateMockP9Data = (employee: Employee) => {
    const data: { [month: string]: { [field: string]: number | string } } = {};
    let totalChargeablePay = 0;
    
    months.forEach(month => {
        const basicSalary = employee.grossPay / 12 * (0.9 + Math.random() * 0.2);
        const benefitsNonCash = basicSalary * 0.1;
        const valueQuarters = 0;
        const totalGross = basicSalary + benefitsNonCash + valueQuarters;
        const dcrsE1 = basicSalary * 0.3;
        const dcrsE2 = 20000;
        const dcrsE3 = 240000;
        const retirementContribution = Math.min(dcrsE1, dcrsE2, dcrsE3);
        const ownerOccupiedInterest = 0;
        const chargeablePay = totalGross - retirementContribution;
        const taxCharged = chargeablePay * 0.3;
        const personalRelief = 2400;
        const insuranceRelief = 0;
        const payeTaxRelief = taxCharged - personalRelief;

        totalChargeablePay += chargeablePay;

        data[month] = {
            basicSalary: basicSalary.toFixed(2),
            benefitsNonCash: benefitsNonCash.toFixed(2),
            valueQuarters: valueQuarters.toFixed(2),
            totalGross: totalGross.toFixed(2),
            dcrsE1: dcrsE1.toFixed(2),
            dcrsE2: dcrsE2.toFixed(2),
            dcrsE3: dcrsE3.toFixed(2),
            ownerOccupiedInterest: ownerOccupiedInterest.toFixed(2),
            retirementContribution: retirementContribution.toFixed(2),
            chargeablePay: chargeablePay.toFixed(2),
            taxCharged: taxCharged.toFixed(2),
            personalRelief: personalRelief.toFixed(2),
            insuranceRelief: insuranceRelief.toFixed(2),
            payeTaxRelief: payeTaxRelief.toFixed(2),
        };
    });

    return { data, totalChargeablePay: totalChargeablePay.toFixed(2) };
};


export const P9Form = ({ employee, company }: P9FormProps) => {
    const reportData = generateMockP9Data(employee);

    return (
        <div className="p9form my-8 break-after-page">
            <div className="center">
                {/* Placeholder for KRA logo */}
                 <p className="font-bold text-lg">KENYA REVENUE AUTHORITY</p>
                 <p className="font-semibold">DOMESTIC TAXES DEPARTMENT</p>
                 <p className="font-bold text-lg">PAYE END OF YEAR CERTIFICATE</p>
            </div>
            <div className="parent">
                <div className="child left">
                    <strong>Employer&apos;s Name: </strong>
                    <strong>{company.name}</strong>
                </div>

                <div className="child left">
                    <strong>Employer&apos;s PIN: </strong>
                    <strong>{company.pin}</strong>
                </div>
            </div>

            <div className="parent left">
                <div className="lone-child left">
                    <strong>Employee&apos;s Main Name: </strong>
                    <strong>{employee.name.split(' ')[1] || ''}</strong>
                </div>
            </div>

            <div className="parent">
                <div className="child left">
                    <strong>Employee&apos;s Other Name: </strong>
                    <strong>{employee.name.split(' ')[0] || ''}</strong>
                </div>

                <div className="child left">
                    <strong>Employee&apos;s PIN: </strong>
                    <strong>{'A' + Math.random().toString().slice(2, 11) + 'Z'}</strong>
                </div>
            </div>
            <table>
                <thead>
                    <tr className="nobottomborder">
                        <th className="bold centercol nobottomborder">MONTH</th>
                        <th className="bold centercol nobottomborder">Basic Salary</th>
                        <th className="bold centercol nobottomborder">Benefits Non Cash</th>
                        <th className="bold centercol nobottomborder">Value of Quarters</th>
                        <th className="bold centercol nobottomborder">Total Gross Pay</th>
                        <th className="bold centercol nobottomborder" colSpan={3}>Defined Contribution Retirement Scheme</th>
                        <th className="bold centercol nobottomborder">Owner Occupied Interest</th>
                        <th className="bold centercol nobottomborder">Retirement Contribution & Owner Occupied Interest</th>
                        <th className="bold centercol nobottomborder">Chargeable Pay</th>
                        <th className="bold centercol nobottomborder">Tax Charged</th>
                        <th className="bold centercol nobottomborder">Personal Relief</th>
                        <th className="bold centercol nobottomborder">Insurance Relief</th>
                        <th className="bold centercol nobottomborder">PAYE Tax (J-K) Relief</th>
                    </tr>
                    <tr>
                        <th className="notopborder"></th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder" colSpan={3}>Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="notopborder"></th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                        <th className="bold centercol notopborder">Kshs</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}></th>
                        <th className="bold centercol" rowSpan={2}>A</th>
                        <th className="bold centercol" rowSpan={2}>B</th>
                        <th className="bold centercol" rowSpan={2}>C</th>
                        <th className="bold centercol" rowSpan={2}>D</th>
                        <th className="bold centercol" colSpan={3}>E</th>
                        <th className="bold centercol" rowSpan={2}>F<br />Amount of<br />Interest</th>
                        <th className="bold centercol" rowSpan={2}>G<br />The Lowest of E<br />added to F</th>
                        <th className="bold centercol">H</th>
                        <th className="bold centercol">J</th>
                        <th className="bold centercol">K</th>
                        <th className="bold centercol"></th>
                        <th className="bold centercol">L</th>
                    </tr>
                    <tr>
                        <th className="bold centercol">E1<br />30%<br />of A</th>
                        <th className="bold centercol">E2<br />Actual</th>
                        <th className="bold centercol">E3<br />Fixed</th>
                        <th></th>
                        <th></th>
                        <th className="bold centercol" colSpan={2}>Total<br />Kshs</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {months.map(mth => (
                        <tr key={mth}>
                            <td>{mth}</td>
                            {fieldNames.map(fieldName => (
                                <td key={fieldName}>
                                    <p>{reportData.data[mth]?.[fieldName] || '-'}</p>
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td className="bold" rowSpan={2}>TOTALS</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}><p>{reportData.totalChargeablePay}</p></td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                        <td rowSpan={2}>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <div className="parent footer-text">
                <div className="shychild left">
                    <p>To be completed by Employer at the end of the year.</p>
                    <span><strong>TOTAL CHARGEABLE PAY (COL. H)</strong> Kshs.</span>
                    <p className="font-bold mt-2">IMPORTANT</p>
                    <p>1. Use P9A</p>
                    <p>(a) For all liable employees and where director/employee received Benefits in addition to cash emoluments.</p>
                    <p>(b) Where an employee is eligible to deduction on owner occupier interest.</p>
                    <p>2. (a) Deductible interest in respect of any month must not exceed Kshs. 12,500/=</p>
                </div>
                <div className="shychild left">
                    <strong>TOTAL TAX (COL. L) Kshs. 1</strong>
                    <p>(b) Attach:</p>
                    <p>(i) Photostat copy of interest certificate and statement of account from the Financial Institution</p>
                    <p>(ii) The DECLARATION duly signed by the employee</p>
                    <strong className="block mt-2">NAMES OF FINANCIAL INSTITUTION ADVANCING MORTGAGE LOAN</strong>
                    <div className="fullunderline">&nbsp;</div>
                    <div className="mt-2">&nbsp;</div>
                    <span className="writting"><strong>L.R NO. OF OWNER OCCUPIED PROPERTY:</strong><div className="halfunderline">&nbsp;</div></span>
                    <div className="mt-2">&nbsp;</div>
                    <span className="writting"><strong>DATE OF OCCUPATION OF HOUSE:</strong><div className="halfunderline">&nbsp;</div></span>
                </div>
            </div>
        </div>
    )
}
