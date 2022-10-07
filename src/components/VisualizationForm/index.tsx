import { FlowsRequestBody, FunnelRequestBody, ReportType } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import FlowsForm from './FlowsForm'
import FunnelForm from './FunnelForm'

type Props = {
  reportType: ReportType
  handleSubmit: (payload: FlowsRequestBody | FunnelRequestBody) => void
  query: FlowsRequestBody | FunnelRequestBody | undefined
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
          query={query as FlowsRequestBody | undefined}
          eventStreams={eventStreams}
        />
      )
    }
    case `funnel`: {
      return (
        <FunnelForm
          handleSubmit={handleSubmit}
          query={query as FunnelRequestBody | undefined}
          eventStreams={eventStreams}
        />
      )
    }
    default: {
      return (
        <FlowsForm
          handleSubmit={handleSubmit}
          query={query as FlowsRequestBody | undefined}
          eventStreams={eventStreams}
        />
      )
    }
  }
}

export default VisualizationForm
