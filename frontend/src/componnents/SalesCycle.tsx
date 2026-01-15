// import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import {api} from "../api"
interface SalesCyclesProps {
    value: string;
    onChange: (value: string) => void;
}
export default function SalesCycles({value, onChange}: SalesCyclesProps ) {
    const [salesCycles, setSalesCycles] = useState<any[]>([]);
    // const [selectedCycle, setSelectedCycle] = useState("");
    
    const fetchSales = async () => {
        const baseUrl = import.meta.env.VITE_API_URL;

        try {
            const res = await api.get(`${baseUrl}/sap-sales-cycles`);
            console.log("cycle:", res.data)
            setSalesCycles(res.data);
        } catch (error: any) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    useEffect(() => {
        if(!value && salesCycles.length > 0){
            const defaultCycle = salesCycles.find((c) => 
                 c.isActive &&
                c.description.toLowerCase() === 'international market'
            );
            if(defaultCycle){
                onChange(defaultCycle.code)
            }
        }

    },[salesCycles] )

    const optionsCycle =       
        salesCycles.filter((cycle) => cycle.isActive == true)
        .map((cycle) => ({
            value: cycle.code,
            label: cycle.description
        }))
    
    const selectedOption = optionsCycle.find(o => o.value === value)


    return (
        <>
            < Select
                options={optionsCycle}
                value={selectedOption}
                onChange={(option) => onChange(option?.value || '')}
                isSearchable={true}
                // placeholder="All Sales Cycle"
            />

        </>
    )
}
