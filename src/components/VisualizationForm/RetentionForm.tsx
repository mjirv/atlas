import useEventStreams from '@/hooks/useEventStreams'
import { RetentionRequestBody } from '@/types'
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import SelectEvent from './SelectEvent'
import SelectEventStream from './SelectEventStream'
import { FormParams } from './types/FormParams'

type Params = FormParams & { query: RetentionRequestBody | undefined }

const RetentionForm = (params: Params): JSX.Element => {
  const { eventStreams, handleSubmit, query } = params
  const { selectedEventStream, handleSelectEventStream } = useEventStreams(
    eventStreams,
    query?.eventStream,
  )
  const [eventType, setEventType] = useState(query?.firstAction)
  const [startDate, setStartDate] = useState(query?.startDate)
  const [endDate, setEndDate] = useState(query?.endDate)

  const handleSetEventType = (e: ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value)
  }

  const handleSetStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
  }

  const handleSetEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
  }

  const valid =
    selectedEventStream?.eventStream && eventType && startDate && endDate

  const payload: RetentionRequestBody = useMemo(
    () => ({
      eventStream: selectedEventStream?.eventStream as string,
      firstAction: eventType as string,
      secondAction: eventType as string,
      startDate: startDate as string,
      endDate: endDate as string,
    }),
    [selectedEventStream, eventType, startDate, endDate],
  )

  const onSubmit = useCallback(() => {
    valid && handleSubmit(payload)
  }, [handleSubmit, payload, valid])

  return (
    <Flex gap="5px" flexWrap="wrap">
      <SelectEventStream
        eventStreams={eventStreams}
        selectedEventStream={selectedEventStream?.eventStream}
        onChange={handleSelectEventStream}
      />
      <SelectEvent
        id="event"
        eventStream={selectedEventStream}
        selectedEvent={eventType}
        handleSelectEvent={handleSetEventType}
        label="Event type"
        placeholder="Select event type"
      />
      <FormLabel>Initial events between:</FormLabel>
      <FormControl id="start-date" isRequired>
        <FormLabel>Start date</FormLabel>
        <Input
          placeholder="Select start date"
          size="md"
          type={`date`}
          onChange={handleSetStartDate}
          value={startDate?.split(`T`)[0]}
        />
      </FormControl>
      <FormControl id="end-date" isRequired>
        <FormLabel>End date</FormLabel>
        <Input
          placeholder="Select end date"
          size="md"
          type={`date`}
          onChange={handleSetEndDate}
          value={endDate?.split(`T`)[0]}
        />
      </FormControl>
      <Button onClick={onSubmit} disabled={!valid}>
        Run Query
      </Button>
    </Flex>
  )
}

export default RetentionForm
