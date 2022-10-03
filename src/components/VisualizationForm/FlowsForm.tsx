import { FlowsRequestBody } from '@/types'
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

type Params = {
  eventStreams: EventStreamResponse | undefined
  handleSubmit: (payload: FlowsRequestBody) => void
  query: FlowsRequestBody | undefined
}

const FlowsForm = (params: Params) => {
  const { eventStreams, handleSubmit, query } = params

  const [primaryEvent, setPrimaryEvent] = useState(query?.primaryEvent)
  const [nEventsFrom, setNEventsFrom] = useState(query?.nEventsFrom)
  const [beforeOrAfter, setBeforeOrAfter] = useState(query?.beforeOrAfter)
  const [topN, setTopN] = useState(query?.topN)
  const findEventStreamByName = useCallback(
    (eventStreamName: string | undefined) =>
      eventStreams?.find(({ eventStream }) => eventStream === eventStreamName),
    [eventStreams],
  )
  const [selectedEventStream, setSelectedEventStream] = useState<
    EventStreamResponse[0] | undefined
  >(findEventStreamByName(query?.eventStream))

  useEffect(() => {
    if (query) {
      setPrimaryEvent(query.primaryEvent)
      setNEventsFrom(query.nEventsFrom)
      setBeforeOrAfter(query.beforeOrAfter)
      setTopN(query.topN)
      setSelectedEventStream(findEventStreamByName(query.eventStream))
    }
  }, [findEventStreamByName, query])

  const handleSelectEventStream = useCallback(
    (option: ChangeEvent<HTMLSelectElement>) => {
      setSelectedEventStream(
        eventStreams?.find(
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

  const handleSetBeforeOrAfter = (beforeOrAfter: 'before' | 'after') => {
    setBeforeOrAfter(beforeOrAfter)
  }

  const handleSetTopN = (n: string) => {
    setTopN(Number(n))
  }

  const payload: FlowsRequestBody = useMemo(
    () => ({
      eventStream: selectedEventStream?.eventStream as string,
      primaryEvent: primaryEvent as string,
      nEventsFrom,
      beforeOrAfter,
      topN,
    }),
    [
      beforeOrAfter,
      nEventsFrom,
      primaryEvent,
      selectedEventStream?.eventStream,
      topN,
    ],
  )

  const onSubmit = useCallback(() => {
    handleSubmit(payload)
  }, [handleSubmit, payload])

  return (
    <Flex gap="5px" flexWrap="wrap">
      <Select
        placeholder="Select event stream"
        value={selectedEventStream?.eventStream}
        onChange={handleSelectEventStream}
      >
        {eventStreams?.map((eventStream, i) => (
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
      <RadioGroup onChange={handleSetBeforeOrAfter} value={beforeOrAfter}>
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
      <Button onClick={onSubmit}>Submit</Button>
    </Flex>
  )
}

export default FlowsForm
