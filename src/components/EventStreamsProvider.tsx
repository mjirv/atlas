import { EventStreamResponse } from '@/types/ApiResponse'
import { createContext, useEffect, useState } from 'react'

export const EventStreamContext = createContext<
  EventStreamResponse | undefined
>(undefined)

const EventStreamsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [eventStreams, setEventStreams] = useState<EventStreamResponse>()

  useEffect(() => {
    const fetchEventStreams = async () => {
      const fetchedEventStreams = (await (
        await fetch(`/api/event_streams`, {
          method: `get`,
        })
      ).json()) as EventStreamResponse
      setEventStreams(fetchedEventStreams)
    }
    fetchEventStreams()
  }, [])

  return (
    <EventStreamContext.Provider value={eventStreams}>
      {children}
    </EventStreamContext.Provider>
  )
}

export default EventStreamsProvider
