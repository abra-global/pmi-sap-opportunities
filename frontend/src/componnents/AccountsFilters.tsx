import Select, { components } from 'react-select';
import type { OptionProps } from 'react-select';

type Option = { value: string; label: string };

interface AccountsFiltersProps {
  ownerOptions: Option[];
  ownerFilter: Option[];
  onOwnerChange: (val: Option[]) => void;

  namesOptions: Option[];
  nameFilter: string;
  onNameChange: (val: string) => void;

  territoryOptions: Option[];
  territoryFilter: Option[];
  onTerritoryChange: (val: Option[]) => void;
}

// Checkbox option (נשאר כאן כי זה UI של פילטרים)
const CheckboxOption = (props: OptionProps<any>) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      readOnly
      style={{ marginRight: 8 }}
    />
    <span>{props.label}</span>
  </components.Option>
);

export default function AccountsFilters({
  ownerOptions,
  ownerFilter,
  onOwnerChange,

  namesOptions,
  nameFilter,
  onNameChange,

  territoryOptions,
  territoryFilter,
  onTerritoryChange,
}: AccountsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 pr-160">
        Filter by:
      </h3>

      <div className="flex gap-8">
        {/* Owner */}
        <div className="max-w-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Owner
          </label>
          <Select
            options={ownerOptions}
            value={ownerFilter}
            onChange={(options) => onOwnerChange([...(options || [])])}
            isMulti
            closeMenuOnSelect
            isSearchable
            components={{ Option: CheckboxOption }}
          />
        </div>

        {/* Name */}
        <div className="max-w-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <Select
            options={namesOptions}
            value={{ value: nameFilter, label: nameFilter }}
            onChange={(option) => onNameChange(option?.value || '')}
            isSearchable
          />
        </div>

        {/* Territory */}
        <div className="max-w-md w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Territory
          </label>
          <Select
            options={territoryOptions}
            value={territoryFilter}
            onChange={(options) => onTerritoryChange([...(options || [])])}
            isMulti
            closeMenuOnSelect
            isSearchable
            components={{ Option: CheckboxOption }}
          />
        </div>
      </div>
    </div>
  );
}
