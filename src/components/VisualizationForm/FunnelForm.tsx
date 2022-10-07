import { FunnelRequestBody } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import SelectEvent from './SelectEvent'
import SelectEventStream from './SelectEventStream'
import { FormParams } from './types/FormParams'

type Params = FormParams & { query: FunnelRequestBody | undefined }

const FunnelForm = (params: Params): JSX.Element => {
  const { eventStreams, handleSubmit, query } = params
  const [steps, setSteps] = useState<string[]>(query?.steps || [])

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

  const payload: FunnelRequestBody = useMemo(
    () => ({
      steps,
      eventStream: selectedEventStream?.eventStream as string,
    }),
    [selectedEventStream?.eventStream, steps],
  )

  const onSubmit = useCallback(() => {
    handleSubmit(payload)
  }, [handleSubmit, payload])

  console.info(steps)

  return (
    <Flex gap="5px" flexWrap="wrap">
      <SelectEventStream
        eventStreams={eventStreams}
        selectedEventStream={selectedEventStream?.eventStream}
        onChange={handleSelectEventStream}
      />
      {steps.map((step, i) => (
        <Flex flexDirection={`column`} key={`select_event_container_${i}`}>
          <SelectEvent
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
        placeholder={`Select event #${steps.length + 1}`}
        eventStream={selectedEventStream}
        selectedEvent={``}
        handleSelectEvent={(e) => setSteps([...steps, e.target.value])}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </Flex>
  )
}

export default FunnelForm
