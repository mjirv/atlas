import { FlowsRequestBody, ReportType } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import FlowsForm from './FlowsForm'

type Props = {
  reportType: ReportType
  handleSubmit: (payload: FlowsRequestBody) => void
  query: FlowsRequestBody | undefined
  eventStreams: EventStreamResponse | undefined
}

const VisualizationForm = ({
  reportType,
  handleSubmit,
  query,
  eventStreams,
}: Props) => {
  switch (reportType) {
    case `flows`: {
      return (
        <FlowsForm
          handleSubmit={handleSubmit}
          query={query}
          eventStreams={eventStreams}
        />
      )
    }
    default: {
      return (
        <FlowsForm
          handleSubmit={handleSubmit}
          query={query}
          eventStreams={eventStreams}
        />
      )
    }
  }
}

export default VisualizationForm
