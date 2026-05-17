"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Country, CountryStatus } from "@/lib/types";
import { countries as defaultCountries } from "@/lib/data/countries";

interface CountriesContextType {
  countries: Country[];
  updateCountryStatus: (iso2: string, status: CountryStatus) => void;
  getCountryByIso2: (iso2: string) => Country | undefined;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export function useCountries() {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
}

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>(defaultCountries);

  const updateCountryStatus = (iso2: string, status: CountryStatus) => {
    setCountries(prev =>
      prev.map(country =>
        country.iso2 === iso2 ? { ...country, status } : country
      )
    );
  };

  const getCountryByIso2 = (iso2: string) => {
    return countries.find(c => c.iso2 === iso2);
  };

  return (
    <CountriesContext.Provider value={{ countries, updateCountryStatus, getCountryByIso2 }}>
      {children}
    </CountriesContext.Provider>
  );
}
