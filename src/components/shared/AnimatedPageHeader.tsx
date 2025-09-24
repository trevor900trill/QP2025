import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedPageHeaderProps {
  title: string;
  icon?: React.ElementType;
}

export function AnimatedPageHeader({ title, icon: Icon }: AnimatedPageHeaderProps) {
  return (
    <div className="mb-8 rounded-lg bg-primary text-primary-foreground p-6 shadow-md animate-expand-width">
      <div className="flex items-center justify-between opacity-0 animate-fade-in-delayed">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {Icon && <Icon className="h-8 w-8 animate-spin-slow" />}
      </div>
    </div>
  );
}
