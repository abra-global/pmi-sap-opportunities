import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"

interface SeriesSelectProps {
    value: string
    onChange: (value: string) => void
}
export default function SeriesSelect({ value, onChange }: SeriesSelectProps) {
    const [series, setSeries] = useState<any[]>([])

    const fetchSeries = async () => {
        const baseUrl = import.meta.env.VITE_API_URL
        try {
            const response = await axios.get(`${baseUrl}/opportunities/series`)
            setSeries(response.data)
            console.log("serriesData: ", response.data)
        } catch (error: any) {
            console.error("Error fetching series: ", error.response?.data || error.message)
        }

    }

    useEffect(() => {
        fetchSeries()

    }, [])
    const seriesOptions = [{value: '', label: 'Select Series'}, ...series.map(ser => ({value: ser.code, label: ser.description})).filter(Boolean)]
    return (
        <>
        <Select
            options={seriesOptions}
            value={value ? seriesOptions.find(option => option.value === value) : null}
            onChange={(option) => onChange(option?.value || '')}
            isSearchable={true}
            placeholder= 'Select Series'
        />
        </>

    )

}