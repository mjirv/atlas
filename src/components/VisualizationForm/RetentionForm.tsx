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
  const [firstEvent, setFirstEvent] = useState(query?.firstAction)
  const [secondEvent, setSecondEvent] = useState(query?.secondAction)
  const [startDate, setStartDate] = useState(query?.startDate)

  const handleSetFirstEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    setFirstEvent(e.target.value)
  }

  const handleSetSecondEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondEvent(e.target.value)
  }

  const handleSetStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value))
  }

  const valid =
    selectedEventStream?.eventStream && firstEvent && secondEvent && startDate

  const payload: RetentionRequestBody = useMemo(
    () => ({
      eventStream: selectedEventStream?.eventStream as string,
      firstAction: firstEvent as string,
      secondAction: secondEvent as string,
      startDate: startDate,
    }),
    [selectedEventStream, firstEvent, secondEvent, startDate],
  )

  const onSubmit = useCallback(() => {
    valid && handleSubmit(payload)
  }, [handleSubmit, payload, valid])

  return (
    <Flex gap="5px" flexWrap="wrap">
      <FormControl id="event-stream" isRequired>
        <FormLabel>Event stream</FormLabel>
        <SelectEventStream
          eventStreams={eventStreams}
          selectedEventStream={selectedEventStream?.eventStream}
          onChange={handleSelectEventStream}
        />
      </FormControl>
      <FormControl id="first-event" isRequired>
        <FormLabel>First event</FormLabel>
        <SelectEvent
          eventStream={selectedEventStream}
          selectedEvent={firstEvent}
          handleSelectEvent={handleSetFirstEvent}
        />
      </FormControl>
      <FormControl id="second-event" isRequired>
        <FormLabel>Second event</FormLabel>
        <SelectEvent
          eventStream={selectedEventStream}
          selectedEvent={secondEvent}
          handleSelectEvent={handleSetSecondEvent}
        />
      </FormControl>
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
