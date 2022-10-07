import { EventStreamResponse } from '@/types/ApiResponse'
import { Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

type Params = {
  eventStream: EventStreamResponse[0] | undefined
  selectedEvent: string | undefined
  handleSelectEvent: (option: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
}

const SelectEvent = ({
  eventStream,
  selectedEvent,
  handleSelectEvent,
  placeholder,
}: Params): JSX.Element => (
  <Select
    placeholder={placeholder ?? `Select primary event`}
    onChange={handleSelectEvent}
    value={selectedEvent}
  >
    {eventStream?.eventTypes.map((eventType, i) => (
      <option key={`event_type_${i}`} value={eventType}>
        {eventType}
      </option>
    ))}
  </Select>
)

export default SelectEvent
