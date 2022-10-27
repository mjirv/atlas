import { EventStreamResponse } from '@/types/ApiResponse'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

type Params = {
  id: string
  eventStream: EventStreamResponse[0] | undefined
  selectedEvent: string | undefined
  handleSelectEvent: (option: ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  label?: string
  placeholder?: string
}

const SelectEvent = (params: Params): JSX.Element => (
  <FormControl id={params.id} display="flex" isRequired={params.required}>
    {params.label && <FormLabel>{params.label}</FormLabel>}
    <Select
      placeholder={params.placeholder ?? `Select primary event`}
      onChange={params.handleSelectEvent}
      value={params.selectedEvent}
    >
      {params.eventStream?.eventTypes.map((eventType, i) => (
        <option key={`event_type_${i}`} value={eventType}>
          {eventType}
        </option>
      ))}
    </Select>
  </FormControl>
)

export default SelectEvent
