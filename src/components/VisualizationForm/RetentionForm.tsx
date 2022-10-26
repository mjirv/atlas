import useEventStreams from '@/hooks/useEventStreams'
import useStartAndEndDates from '@/hooks/useStartAndEndDate'
import { RetentionRequestBody } from '@/types'
import { Button, Flex } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import SelectEvent from './SelectEvent'
import SelectEventStream from './SelectEventStream'
import StartAndEndDates from './StartAndEndDates'
import { FormParams } from './types/FormParams'

type Params = FormParams & { query: RetentionRequestBody | undefined }

const RetentionForm = (params: Params): JSX.Element => {
  const { eventStreams, handleSubmit, query } = params
  const { selectedEventStream, handleSelectEventStream } = useEventStreams(
    eventStreams,
    query?.eventStream,
  )
  const [eventType, setEventType] = useState(query?.firstAction)
  const handleSetEventType = (e: ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value)
  }
  const { startDate, endDate, handleSetStartDate, handleSetEndDate } =
    useStartAndEndDates(query)

  const valid = selectedEventStream?.eventStream && eventType

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
      <StartAndEndDates
        startDate={startDate}
        endDate={endDate}
        handleSetStartDate={handleSetStartDate}
        handleSetEndDate={handleSetEndDate}
      />
      <Button onClick={onSubmit} disabled={!valid}>
        Run Query
      </Button>
    </Flex>
  )
}

export default RetentionForm
