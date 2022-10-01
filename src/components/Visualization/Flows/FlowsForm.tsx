import { EventStreamResponse } from '@/types/ApiResponse'
import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react'
import { ChangeEvent, useCallback } from 'react'

type Params = {
  eventStreams: EventStreamResponse
  selectedEventStream: EventStreamResponse[0] | undefined
  setSelectedEventStream: (
    eventStream: EventStreamResponse[0] | undefined,
  ) => void
  primaryEvent: string | undefined
  setPrimaryEvent: (primaryEvent: string) => void
  nEventsFrom?: number
  setNEventsFrom: (nEventsFrom: number) => void
  beforeOrAfter?: 'before' | 'after'
  setBeforeOrAfter: (beforeOrAfter: 'before' | 'after') => void
  topN?: number
  setTopN: (topN: number) => void
  handleSubmit: () => void
}

const FlowsForm = (params: Params) => {
  const {
    eventStreams,
    selectedEventStream,
    setSelectedEventStream,
    primaryEvent,
    setPrimaryEvent,
    nEventsFrom,
    setNEventsFrom,
    beforeOrAfter,
    setBeforeOrAfter,
    topN,
    setTopN,
    handleSubmit,
  } = params

  const handleSelectEventStream = useCallback(
    (option: ChangeEvent<HTMLSelectElement>) => {
      setSelectedEventStream(
        eventStreams.find(
          ({ eventStream }) => eventStream === option.target.value,
        ),
      )
    },
    [eventStreams, setSelectedEventStream],
  )

  const handleSetPrimaryEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrimaryEvent(e.target.value)
  }

  const handleSetNEventsFrom = (n: string) => {
    setNEventsFrom(Number(n))
  }

  const handleSetTopN = (n: string) => {
    setTopN(Number(n))
  }

  return (
    <Flex>
      <Select
        placeholder="Select event stream"
        value={selectedEventStream?.eventStream}
        onChange={handleSelectEventStream}
      >
        {eventStreams.map((eventStream, i) => (
          <option key={`event_stream_${i}`} value={eventStream.eventStream}>
            {eventStream.eventStream}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select primary event"
        value={primaryEvent}
        onChange={handleSetPrimaryEvent}
      >
        {selectedEventStream?.eventTypes.map((eventType, i) => (
          <option key={`event_type_${i}`} value={eventType}>
            {eventType}
          </option>
        ))}
      </Select>
      <NumberInput
        min={1}
        max={20}
        placeholder="Number of events before/after"
        value={nEventsFrom}
        onChange={handleSetNEventsFrom}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <RadioGroup onChange={setBeforeOrAfter} value={beforeOrAfter}>
        <Stack direction="row">
          <Radio value="before">Before</Radio>
          <Radio value="after">After</Radio>
        </Stack>
      </RadioGroup>
      <NumberInput
        min={1}
        max={20}
        placeholder="Number of flows to show"
        value={topN}
        onChange={handleSetTopN}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={handleSubmit}>Submit</Button>
    </Flex>
  )
}

export default FlowsForm
