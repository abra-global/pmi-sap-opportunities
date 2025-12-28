import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

interface StatusProps {
    value: string,
    onChange: (value: string) => void
}

export default function OpportunityStatus({ value, onChange }: StatusProps) {
    const [status, setStatus] = useState<any[]>([]);

    const baseUrl = import.meta.env.VITE_API_URL


    const fetchStatus = async () => {
        try {
            const res = await axios.get(`${baseUrl}/sap-status`)
            console.log(res)
            console.log(res.data)
            setStatus(res.data)

        }
        catch (error: any) {
            console.log("error:", error)
        }

    }
    useEffect(() => {
        fetchStatus()

    }, [])
    


    const statusOptions = status
  .filter(s => s.isActive)
  .map(stat => ({
    value: stat.code,
    label: stat.description
  }));
    const statusOpen = statusOptions.find(s => s.label.toLowerCase() === 'open')
    const defaultValue = value ? statusOptions.find(o => o.value === value) : statusOptions.find(o => o.value === statusOpen?.value)

    return (
        <>
            <Select
                options={statusOptions}
                value={defaultValue}
                onChange={(option) => onChange(option?.value || '')}
                isSearchable={true}
                placeholder='Select Status'

            />
        </>

    )

}