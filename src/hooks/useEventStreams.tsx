import { EventStreamResponse } from '@/types/ApiResponse'
import { useState, useCallback, ChangeEvent, useEffect } from 'react'

const useEventStreams = (
  eventStreams: EventStreamResponse | undefined,
  initialEventStream: string | undefined,
) => {
  const findEventStreamByName = useCallback(
    (eventStreamName: string | undefined) =>
      eventStreams?.find(({ eventStream }) => eventStream === eventStreamName),
    [eventStreams],
  )

  const [selectedEventStream, setSelectedEventStream] = useState<
    EventStreamResponse[0] | undefined
  >(findEventStreamByName(initialEventStream))

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
    if (eventStreams && eventStreams.length > 0) {
      setSelectedEventStream(eventStreams[0])
    }
  }, [eventStreams])

  return { selectedEventStream, handleSelectEventStream }
}

export default useEventStreams
