import useStartAndEndDates from '@/hooks/useStartAndEndDate'
import { FunnelRequestBody } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import SelectEvent from './SelectEvent'
import SelectEventStream from './SelectEventStream'
import StartAndEndDates from './StartAndEndDates'
import { FormParams } from './types/FormParams'

type Params = FormParams & { query: FunnelRequestBody | undefined }

const FunnelForm = (params: Params): JSX.Element => {
  const { eventStreams, handleSubmit, query } = params
  const [steps, setSteps] = useState<string[]>(query?.steps || [])
  const { startDate, endDate, handleSetStartDate, handleSetEndDate } =
    useStartAndEndDates(query)

  const findEventStreamByName = useCallback(
    (eventStreamName: string | undefined) =>
      eventStreams?.find(({ eventStream }) => eventStream === eventStreamName),
    [eventStreams],
  )
  const [selectedEventStream, setSelectedEventStream] = useState<
    EventStreamResponse[0] | undefined
  >(findEventStreamByName(query?.eventStream))
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

  useEffect(() => {
    if (query) {
      setSelectedEventStream(findEventStreamByName(query.eventStream))
    } else {
      setSelectedEventStream(eventStreams?.[0])
    }
  }, [eventStreams, findEventStreamByName, query])

  const payload: FunnelRequestBody = useMemo(
    () => ({
      steps,
      eventStream: selectedEventStream?.eventStream as string,
    }),
    [selectedEventStream?.eventStream, steps],
  )

  const valid = eventStreams && steps.length >= 2

  const onSubmit = useCallback(() => {
    handleSubmit(payload)
  }, [handleSubmit, payload])

  return (
    <Flex flexDirection="row" gap="5px" flexWrap="wrap">
      <SelectEventStream
        eventStreams={eventStreams}
        selectedEventStream={selectedEventStream?.eventStream}
        onChange={handleSelectEventStream}
      />
      {steps.map((step, i) => (
        <Flex flexDirection={`column`} key={`select_event_container_${i}`}>
          <SelectEvent
            id={`event-${i}`}
            placeholder={`Select event #${i + 1}`}
            key={`step_${i}`}
            eventStream={selectedEventStream}
            selectedEvent={step}
            handleSelectEvent={(e) =>
              setSteps([
                ...steps.slice(0, i),
                e.target.value,
                ...steps.slice(i + 1, steps.length),
              ])
            }
          />
          <DeleteIcon
            style={{ cursor: `pointer` }}
            onClick={() =>
              setSteps([
                ...steps.slice(0, i),
                ...steps.slice(i + 1, steps.length),
              ])
            }
          />
        </Flex>
      ))}
      <SelectEvent
        id={`event-new`}
        label="Add event"
        required={steps.length < 2}
        placeholder={`Select event #${steps.length + 1}`}
        eventStream={selectedEventStream}
        selectedEvent={``}
        handleSelectEvent={(e) => setSteps([...steps, e.target.value])}
      />
      <StartAndEndDates
        startDate={startDate}
        endDate={endDate}
        handleSetStartDate={handleSetStartDate}
        handleSetEndDate={handleSetEndDate}
      />
      <Button onClick={onSubmit} colorScheme="green" disabled={!valid}>
        Run Query
      </Button>
    </Flex>
  )
}

export default FunnelForm
