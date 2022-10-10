import { EventStreamResponse } from '@/types/ApiResponse'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

type Params = {
  eventStreams: EventStreamResponse | undefined
  selectedEventStream: string | undefined
  onChange: (option: ChangeEvent<HTMLSelectElement>) => void
}

const SelectEventStream = ({
  eventStreams,
  selectedEventStream,
  onChange,
}: Params): JSX.Element => (
  <FormControl id="event-stream" isRequired>
    <FormLabel>Event stream</FormLabel>
    <Select
      placeholder="Select event stream"
      value={selectedEventStream}
      onChange={onChange}
    >
      {eventStreams?.map((eventStream, i) => (
        <option key={`event_stream_${i}`} value={eventStream.eventStream}>
          {eventStream.eventStream}
        </option>
      ))}
    </Select>
  </FormControl>
)

export default SelectEventStream
