import { FlowsData } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import { Flex, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import FlowsForm from './FlowsForm'
import FlowsVisualization from './FlowsVisualization'

const Flows = ({ data }: { data: FlowsData | undefined }) => {
  const [eventStreams, setEventStreams] = useState<EventStreamResponse>([])
  const [selectedEventStream, setSelectedEventStream] =
    useState<EventStreamResponse[0]>()

  useEffect(() => {
    const fetchEventStreams = async () => {
      const fetchedEventStreams = (await (
        await fetch(`/api/event_streams`, {
          method: `get`,
        })
      ).json()) as EventStreamResponse
      setEventStreams(fetchedEventStreams)
      setSelectedEventStream(fetchedEventStreams[0])
    }
    fetchEventStreams()
  }, [])
  return (
    <Flex>
      <FlowsForm
        eventStreams={eventStreams}
        selectedEventStream={selectedEventStream}
        setSelectedEventStream={setSelectedEventStream}
      />
      {data ? <FlowsVisualization data={data} /> : <Spinner size="xl" />}
    </Flex>
  )
}

export default Flows
