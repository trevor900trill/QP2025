import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedPageHeaderProps {
  title: string;
  icon?: React.ElementType;
  iconAnimation?: 'spin' | 'pulse' | 'breathe' | 'bob' | 'shake' | 'slide';
}

const animationClasses = {
    spin: 'animate-spin-slow',
    pulse: 'animate-pulse',
    breathe: 'animate-breathe',
    bob: 'animate-bob',
    shake: 'animate-shake',
    slide: 'animate-slide-vertical',
}

export function AnimatedPageHeader({ title, icon: Icon, iconAnimation = 'spin' }: AnimatedPageHeaderProps) {
  return (
    <div className="mb-8 rounded-lg bg-primary text-primary-foreground p-6 shadow-md animate-expand-width">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight opacity-0 animate-fade-in-delayed">
          {title}
        </h1>
        {Icon && <Icon className={cn("h-8 w-8", animationClasses[iconAnimation])} />}
      </div>
    </div>
  );
}
