import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  backHref?: string;
  backText?: string;
};

export function PageHeader({ title, description, children, className, backHref, backText }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8", className)}>
      <div className="grid gap-2">
        {backHref && (
            <Link href={backHref}>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {backText || "Back"}
                </Button>
            </Link>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
