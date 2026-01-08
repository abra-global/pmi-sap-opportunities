import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

type TableHeadProps = {
  headName: string;
  field: 'name' | 'territory';
  sortField: string | null;
  sortDirection: 'asc' | 'desc' | null;
  handleSort: (field: string, direction: 'asc' | 'desc') => void;
}

export function TableHead({ headName, field, sortField, sortDirection, handleSort }: TableHeadProps) {
  return (
    <th className="px-6 py-4 pl-10 text-left text-sm font-semibold text-gray-900 flex items-center">
      <p className='mr-2'>{headName}</p>
      
      <FaArrowUp
        color={sortDirection === 'asc' && sortField === field ? 'purple' : 'gray'}
        className="cursor-pointer"
        onClick={() => handleSort(field, 'asc')}
      />

      <FaArrowDown
        color={sortDirection === 'desc' && sortField === field ? 'purple' : 'gray'}
        className="cursor-pointer"
        onClick={() => handleSort(field, 'desc')}
      />
    </th>
  )
}
