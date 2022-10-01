import { EventStreamResponse } from '@/types/ApiResponse'
import { Flex, Select } from '@chakra-ui/react'

type Params = {
  eventStreams: EventStreamResponse
  selectedEventStream: EventStreamResponse[0] | undefined
  setSelectedEventStream: (
    eventStream: EventStreamResponse[0] | undefined,
  ) => void
}

const FlowsForm = (params: Params) => {
  const { eventStreams, selectedEventStream, setSelectedEventStream } = params

  return (
    <Flex>
      <Select
        placeholder="Select event stream"
        defaultValue={selectedEventStream?.eventStream}
        onChange={(option) =>
          setSelectedEventStream(
            eventStreams.find(
              ({ eventStream }) => eventStream === option.target.value,
            ),
          )
        }
      >
        {eventStreams.map((eventStream, i) => (
          <option key={`event_stream_${i}`} value={eventStream.eventStream}>
            {eventStream.eventStream}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default FlowsForm
