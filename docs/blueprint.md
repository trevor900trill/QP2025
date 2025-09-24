# **App Name**: QwikPace

## Core Features:

- User Authentication: Register, login, and refresh authentication tokens using the provided endpoints. AES decrypt login token.
- Module Selection: Present an Odoo-like module selection view after login to differentiate between admin and employee modules. Adjust view appropriately based on user's admin/employee status.
- Admin Module: Admin dashboard displaying key metrics. Sidebar navigation includes: Dashboard, Users, Companies (with company-specific data selection via a dropdown), Onboarding (Employees), Reports, and Settings.
- Employee Module: Employee dashboard displaying personal details and downloadable payslips. Sidebar includes: Dashboard, Profile Details, and Payslips.
- Data Tables: Implement searchable, paginated data tables across the application, particularly within the Reports section. CSV downloads where relevant
- Settings Configuration: Enable user input of the AES encryption key for token decryption via env variables and configure user specific details.
- Automated Insights: Generate a report highlighting potential data anomalies using an AI tool that identifies areas for further manual inspection.

## Style Guidelines:

- Primary color: #42b983, a muted green to inspire feelings of security, growth, and trust.
- Background color: #e5f3ed, a light tint of the primary to keep it consistent but not overwhelming.
- Accent color: #4283b9, an analogous blue for contrast and to represent trustworthiness.
- Body and headline font: 'PT Sans' sans-serif font, providing a balance of modernity and approachability for readability and a professional feel.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clean, consistent icons from a single set (e.g., FontAwesome) to ensure visual uniformity. Icons should be used sparingly and purposefully.
- Use a consistent grid system and spacing throughout the application.  The sidebar should be fixed-width. Content areas should adapt fluidly to different screen sizes.