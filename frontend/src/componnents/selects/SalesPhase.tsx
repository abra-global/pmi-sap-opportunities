// import axios from "axios"
import { useEffect, useState } from "react";
import Select from "react-select"
import { api } from "../../api"
interface SalesPhaseProps {
    value: string,
    onChange: (value: string) => void,
    selectedCycleCode?: string
}
export default function SalesPhase({ value, onChange, selectedCycleCode }: SalesPhaseProps) {
    const [salesPhase, setSalesPhase] = useState<any[]>([]);
    // const [selectedPhase, setSelectedPhase] = useState('')

    const fetchPhase = async () => {
        const baseUrl = import.meta.env.VITE_API_URL
        try {
            const res = await api.get(`${baseUrl}/sap-sales-cycles`)
            console.log("response:", res.data)
            const activeCycles = res.data.filter((cycle: any) => cycle.isActive === true);
            console.log('activeCycles: ', activeCycles)

            const allPhases
                = activeCycles.flatMap((cycle: any) =>
                    cycle.salesPhases.map((phase: any) => ({
                        ...phase,
                        cycleCode: cycle.code
                    }))
                );

            console.log('allPhases:', allPhases)
            setSalesPhase(allPhases)
        }
        catch (error: any) {
            console.error("Error:", error);
        }


    }
    useEffect(() => {
        fetchPhase()

    }, [])


     useEffect(() => {
        if (!value && salesPhase.length > 0) {
            const defaultPhase = salesPhase.find((p) => p.description.toLowerCase() === 'open line/license ')
            console.log("default phase:", defaultPhase)
            if(defaultPhase){
                onChange(defaultPhase.code);

            }
            
        }
    }, [salesPhase, value])
    

    const filteredPhases = selectedCycleCode
        ? salesPhase.filter(phase => phase.cycleCode === selectedCycleCode)
        : Array.from(
            new Map(salesPhase.map(phase => [phase.code, phase])).values()
        )
    const phaseOptions = filteredPhases
        .map((phase) => ({
            value: phase.code,
            label: phase.description
        }))

   
    const selectedPhase = phaseOptions.find(o => o.value === value)
    console.log("selectedPhase:", selectedPhase)

    return (


        <>
            <Select
                options={phaseOptions}
                value={selectedPhase}
                onChange={(option) => onChange(option?.value || '')}
                isSearchable={true}
                // placeholder='Select Sales Phase'
            />
        </>
    )
}
