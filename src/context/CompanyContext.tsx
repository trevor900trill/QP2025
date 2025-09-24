"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Company } from '@/lib/definitions';
import { companies } from '@/lib/placeholder-data';

interface CompanyContextType {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  availableCompanies: Company[];
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(companies[0] || null);

  const value = useMemo(() => ({
    selectedCompany,
    setSelectedCompany,
    availableCompanies: companies,
  }), [selectedCompany]);

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
