import { useEffect, useState } from 'react';


import SalesCycles from './SalesCycle';
import SalesPhase from './SalesPhase';
import OpportunityStatus from './OpportunityStatus'
import CategoriesSelect from './CategoriesSelect';


import { useAccounts } from '../hooks/useAccounts';
import { api } from "../api"
import AccountsFilters from './AccountsFilters';
import AccountsTable from './AccountsTable';
function OpportunityCreation() {

    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [opportunityName, setOpportunityName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedPhase, setSelectedPhase] = useState('')

    // חיפוש סטייטס
    const [ownerFilter, setOwnerFilter] = useState<{ value: string; label: string }[]>([]);
    const [nameFilter, setNameFilter] = useState('All Names');
    const [territoryFilter, setTerritoryFilter] = useState<{ value: string; label: string }[]>([]);
    const [selectedCycle, setSelectedCycle] = useState('');

    const [sortField, setSortField] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

    // const baseUrl = import.meta.env.VITE_API_URL as string

    const { accounts, loading, setAccounts, setLoading } = useAccounts();

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        setSortField(field)
        setSortDirection(direction)

        const sorted = [...accounts].sort((a, b) => {
            let aValue: string = ''
            let bValue: string = ''

            if (field === 'name') {
                aValue = a.formattedName ?? ''
                bValue = b.formattedName ?? ''
            } else if (field === 'territory') {
                aValue = a.salesTerritories?.[0]?.salesTerritoryName ?? ''
                bValue = b.salesTerritories?.[0]?.salesTerritoryName ?? ''
            }

            return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        })

        setAccounts(sorted)
    }

    //חיפוש לפי owner
    const ownersFromAccounts = [
        ...new Set(accounts.map((owner) => owner.ownerFormattedName)
            .filter((name): name is string => Boolean(name)))]
        .sort()
    const owners = ['All Owners', ...ownersFromAccounts];
    const ownerOptions = owners.map((o) => ({ value: o, label: o }))

    //חיפוש לפי שם לקוח
    const nameFromAccounts = [...new Set(accounts.map(name => name.formattedName).filter(Boolean))].sort()
    const namesAccounts = ['All Names', ...nameFromAccounts];
    const namesOptions = namesAccounts.map((n) => ({ value: n, label: n }))

    //חיפוש לפי טריטוריה
    const territoryFromAccounts = [...new Set(accounts.map(territory => territory.salesTerritories?.[0].salesTerritoryName).filter((name): name is string => Boolean(name)))].sort()
    console.log("territoryFromAccounts ", territoryFromAccounts)
    const territoryAcconts = ['All Territories', 'All except USA', ...territoryFromAccounts];
    const territoryOptions = territoryAcconts.map((t) => ({ value: t, label: t }))


    const filteredAccounts = accounts.filter(acc => {
        const ownerMatch =
            ownerFilter.length === 0 ||
            ownerFilter.some(filter => filter.value === acc.ownerFormattedName);

        const nameMatch =
            nameFilter === 'All Names' ||
            acc.formattedName === nameFilter;

        const selectedTerritoryValues = territoryFilter.map(f => f.value);
        const accountTerritory = acc.salesTerritories?.[0]?.salesTerritoryName || '';

        const territoryMatch =
            territoryFilter.length === 0 ||
            selectedTerritoryValues.includes('All Territories') ||
            (selectedTerritoryValues.includes('All except USA') && accountTerritory !== 'United States') ||
            selectedTerritoryValues.includes(accountTerritory);


        return ownerMatch && nameMatch && territoryMatch;
    });



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
    console.log("filtered: ", filteredAccounts)
    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)






    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedAccounts(currentAccounts.map(acc => acc.displayId));
        } else {
            setSelectedAccounts([]);
        }
    };

    const handleSelectAccount = (displayId: string) => {
        setSelectedAccounts(prev =>
            prev.includes(displayId)
                ? prev.filter(c => c !== displayId)
                : [...prev, displayId]
        );
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const isFormValid =
        opportunityName.trim() !== '' &&
        selectedAccounts.length > 0 &&
        selectedCycle &&
        selectedPhase &&
        selectedStatus &&
        selectedCategory;

    const [showValidationError, setShowValidationError] = useState(false);

    const handleCreateClick = () => {
        if (!isFormValid) {
            setShowValidationError(true);
            return;
        }

        handleCreateOpportunities();
    };

    const handleCreateOpportunities = async () => {


        if (selectedAccounts.length === 0) {
            alert('Please select at least one customer');
            return;
        }
        if (!isFormValid) {
            alert('Please fill in all required fields and select at least one customer');
            return;
        }

        setLoading(true);

        try {


            const selectedAccountsData = selectedAccounts.map(displayID => {
                const account = accounts.find(acc => acc.displayId === displayID)
                return {
                    id: account?.id,
                    name: account?.formattedName
                }
            }).filter(acc => acc.id && acc.name)

            const response = await api.post(`/opportunities`, {
                oppName: opportunityName,
                accounts: selectedAccountsData,
                salesCycleCode: selectedCycle,
                salesPhaseCode: selectedPhase,
                lifeCycleStatus: selectedStatus,
                processingTypeCode: selectedCategory
            });

            console.log('ResponseData:', response.data);

            const { successful, failed, results } = response.data;

            if (failed === 0) {
                alert(`✅ Successfully created ${successful} opportunities!`);
            } else {
                const failedDetails = results
                    .filter((r: any) => !r.success)
                    .map((r: any) => `${r.accountId}: ${r.error}`)
                    .join('\n');

                alert(`Created ${successful} opportunities\n${failed} failed:\n${failedDetails}`);
            }


            setSelectedAccounts([]);
            setOpportunityName('');
            setSelectedStatus('');
            setSelectedPhase('');
            setSelectedCycle('')
            setSelectedStatus('');
            setSelectedCategory('');

        } catch (error: any) {
            console.error('Error:', error);
            alert('Error ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }
    const handleCancel = () => {
        setSelectedAccounts([]);
        setOpportunityName('');
        setSelectedStatus('');
        setSelectedPhase('');
        setSelectedCycle('')
        setSelectedStatus('');
        setSelectedCategory('');

    }
    useEffect(() => {
        setSelectedAccounts([]);

        setCurrentPage(1);
    }, [selectedCycle]);



    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                    New Brand Opportunities Creation
                </h2>

                {/* // Filter Sections */}
                <AccountsFilters
                    ownerOptions={ownerOptions}
                    ownerFilter={ownerFilter}
                    onOwnerChange={setOwnerFilter}

                    namesOptions={namesOptions}
                    nameFilter={nameFilter}
                    onNameChange={setNameFilter}

                    territoryOptions={territoryOptions}
                    territoryFilter={territoryFilter}
                    onTerritoryChange={setTerritoryFilter}
                />
                {/*  Account table section */}
                <AccountsTable
                    accounts={currentAccounts}
                    selectedAccounts={selectedAccounts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={filteredAccounts.length}

                    onSelectAccount={handleSelectAccount}
                    onSelectAll={handleSelectAll}

                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}

                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />




                {/* Create Opportunity Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h5 className="text-lg font-medium text-gray-900 mb-6">
                        Create Opportunity with:
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Row 1 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={opportunityName}
                                onChange={(e) => setOpportunityName(e.target.value)}
                                placeholder="Enter opportunity name"
                                className={`w-full px-4 py-2.5 border rounded-lg
    ${!opportunityName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {/* Sales Cycle */}
                        <div className="max-w-md w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sales Cycle <span className="text-red-500">*</span>
                            </label>
                            <SalesCycles
                                value={selectedCycle}
                                onChange={setSelectedCycle}
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sales Phase <span className="text-red-500">*</span>
                            </label>

                            < SalesPhase

                                value={selectedPhase}
                                onChange={setSelectedPhase}
                                selectedCycleCode={selectedCycle} />
                        </div>


                        {/* Row 2 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status <span className="text-red-500">*</span>
                            </label>
                            < OpportunityStatus
                                value={selectedStatus}
                                onChange={setSelectedStatus} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand <span className="text-red-500">*</span>
                            </label>
                            <CategoriesSelect
                                value={selectedCategory}
                                onChange={setSelectedCategory} />
                        </div>


                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg
                             text-gray-700 font-medium hover:bg-gray-50 focus:ring-2
                              focus:ring-gray-500 focus:ring-offset-2"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            className="px-6 py-2.5 rounded-lg text-white font-medium"
                            style={{ backgroundColor: '#2563eb' }}
                            onClick={handleCreateClick}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Opportunities'}
                        </button>
                    </div>
                </div>
            </div>
            {showValidationError && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Error
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Please fill in all required fields and select at least one client
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 rounded-lg text-white"
                                style={{ backgroundColor: '#2563eb' }}
                                onClick={() => setShowValidationError(false)}
                            >
                                I understand
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}

export default OpportunityCreation;