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

  const handleSetEventType = (e: ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value)
  }

  const handleSetStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value))
  }

  const valid = selectedEventStream?.eventStream && eventType && startDate

  const payload: RetentionRequestBody = useMemo(
    () => ({
      eventStream: selectedEventStream?.eventStream as string,
      firstAction: eventType as string,
      secondAction: eventType as string,
      startDate: startDate,
    }),
    [selectedEventStream, eventType, startDate],
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
      <FormControl id="start-date" isRequired>
        <FormLabel>Start date</FormLabel>
        <Input
          placeholder="Select start date"
          size="md"
          type={`date`}
          onChange={handleSetStartDate}
          value={startDate?.toISOString().split(`T`)[0]}
        />
      </FormControl>
      <Button onClick={onSubmit} disabled={!valid}>
        Run Query
      </Button>
    </Flex>
  )
}

export default RetentionForm
