import { FlowsData, FlowsRequestBody } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import FlowsForm from './FlowsForm'
import FlowsVisualization from './FlowsVisualization'

const Flows = ({ data }: { data: FlowsData | undefined }) => {
  const [eventStreams, setEventStreams] = useState<EventStreamResponse>([])
  const [primaryEvent, setPrimaryEvent] = useState<string>()
  const [nEventsFrom, setNEventsFrom] = useState<number>()
  const [beforeOrAfter, setBeforeOrAfter] = useState<'before' | 'after'>()
  const [topN, setTopN] = useState<number>()
  const [selectedEventStream, setSelectedEventStream] =
    useState<EventStreamResponse[0]>()

  const router = useRouter()

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

  const handleSubmit = () => {
    const payload: FlowsRequestBody = {
      eventStream: selectedEventStream?.eventStream as string,
      primaryEvent: primaryEvent as string,
      nEventsFrom,
      beforeOrAfter,
      topN,
    }

    router.replace({
      query: {
        ...router.query,
        query: Buffer.from(JSON.stringify(payload)).toString(`base64`),
      },
    })
  }
  return (
    <Flex height={`500px`} flexDirection="column">
      <FlowsForm
        eventStreams={eventStreams}
        selectedEventStream={selectedEventStream}
        setSelectedEventStream={setSelectedEventStream}
        primaryEvent={primaryEvent}
        setPrimaryEvent={setPrimaryEvent}
        nEventsFrom={nEventsFrom}
        setNEventsFrom={setNEventsFrom}
        beforeOrAfter={beforeOrAfter}
        setBeforeOrAfter={setBeforeOrAfter}
        topN={topN}
        setTopN={setTopN}
        handleSubmit={handleSubmit}
      />
      {data ? <FlowsVisualization data={data} /> : <Spinner size="xl" />}
    </Flex>
  )
}

export default Flows
