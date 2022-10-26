import { useState, ChangeEvent } from 'react'

type Params = {
  startDate?: string
  endDate?: string
}

const useStartAndEndDates = (params?: Params) => {
  const [startDate, setStartDate] = useState(params?.startDate)
  const [endDate, setEndDate] = useState(params?.endDate)
  const handleSetStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
  }
  const handleSetEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
  }

  return { startDate, endDate, handleSetStartDate, handleSetEndDate }
}

export default useStartAndEndDates
