import { FormLabel, FormControl, Input } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

type Params = {
  handleSetStartDate: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetEndDate: (e: ChangeEvent<HTMLInputElement>) => void
  startDate?: string
  endDate?: string
  required?: boolean
}

const StartAndEndDates = (params: Params) => {
  return (
    <FormControl id="date-control" display="flex">
      <FormLabel>Events between:</FormLabel>
      <FormControl id="start-date" isRequired={params.required}>
        <FormLabel>Start date</FormLabel>
        <Input
          placeholder="Select start date"
          size="md"
          type={`date`}
          onChange={params.handleSetStartDate}
          value={params.startDate?.split(`T`)[0]}
        />
      </FormControl>
      <FormControl id="end-date" isRequired={params.required}>
        <FormLabel>End date</FormLabel>
        <Input
          placeholder="Select end date"
          size="md"
          type={`date`}
          onChange={params.handleSetEndDate}
          value={params.endDate?.split(`T`)[0]}
        />
      </FormControl>
    </FormControl>
  )
}

export default StartAndEndDates
