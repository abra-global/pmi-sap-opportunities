import { useState, useEffect } from 'react';
// import axios from 'axios';
import {api} from "../api"
interface SalesTerritory {
  salesTerritoryName: string;
}

interface Account {
  id: string;
  displayId: string;
  formattedName: string;
  ownerFormattedName?: string;
  salesTerritories?: SalesTerritory[];
}

interface UseAccountsReturn {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
 
  refetch: () => Promise<void>;
}

export const useAccounts = (): UseAccountsReturn => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//   const baseUrl = import.meta.env.VITE_API_URL as string;

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await api.get(`/sap-accounts`);
      setAccounts(results.data);
    } catch (err: any) {
      console.error("Error fetching accounts:", err);
      setError(err.message || "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };
  if (error) {
  console.error(error);
}

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    setAccounts,
    loading,
    setLoading,
    refetch: fetchAccounts,
  };
};