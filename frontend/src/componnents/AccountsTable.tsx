import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TableHead } from './TableHead';

interface Account {
  id: string;
  displayId: string;
  formattedName: string;
  ownerFormattedName?: string;
  salesTerritories?: {
    salesTerritoryName: string;
  }[];
}

interface AccountsTableProps {
  accounts: Account[];
  selectedAccounts: string[];

  currentPage: number;
  totalPages: number;

  onSelectAccount: (id: string) => void;
  onSelectAll: (checked: boolean) => void;

  onNextPage: () => void;
  onPrevPage: () => void;

  sortField: string | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: string, dir: 'asc' | 'desc') => void;

  totalRecords: number;
}

export default function AccountsTable({
  accounts,
  selectedAccounts,
  currentPage,
  totalPages,
  onSelectAccount,
  onSelectAll,
  onNextPage,
  onPrevPage,
  sortField,
  sortDirection,
  onSort,
  totalRecords,
}: AccountsTableProps) {
  const allChecked =
    accounts.length > 0 &&
    accounts.every(acc => selectedAccounts.includes(acc.displayId));

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    All
                  </span>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>
              </th>

              <TableHead
                headName="Client Name"
                field="name"
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={onSort}
              />

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Owner
              </th>

              <TableHead
                headName="Territory"
                field="territory"
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={onSort}
              />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {accounts.map(account => (
              <tr key={account.displayId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.displayId)}
                    onChange={() => onSelectAccount(account.displayId)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {account.formattedName?.includes(' ') ? account.formattedName?.substring(
                    0,
                    account.formattedName.lastIndexOf(' ')
                  ): account.formattedName}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {account.ownerFormattedName || '-'}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {account.salesTerritories?.[0]?.salesTerritoryName || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-700 flex gap-6">
          <span>Total Records: {totalRecords}</span>
          <span>Total Selected: {selectedAccounts.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={onPrevPage}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={onNextPage}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
