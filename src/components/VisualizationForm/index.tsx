import {
  FlowsRequestBody,
  FunnelRequestBody,
  ReportType,
  RetentionRequestBody,
} from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'
import FlowsForm from './FlowsForm'
import FunnelForm from './FunnelForm'
import RetentionForm from './RetentionForm'

type Props = {
  reportType: ReportType
  handleSubmit: (
    payload: FlowsRequestBody | FunnelRequestBody | RetentionRequestBody,
  ) => void
  query: FlowsRequestBody | FunnelRequestBody | RetentionRequestBody | undefined
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
    case `retention`: {
      return (
        <RetentionForm
          handleSubmit={handleSubmit}
          query={query as RetentionRequestBody | undefined}
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
