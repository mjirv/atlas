import { FlowsRequestBody, FunnelRequestBody } from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'

export type FormParams = {
  eventStreams: EventStreamResponse | undefined
  handleSubmit: (payload: FlowsRequestBody | FunnelRequestBody) => void
  query: FlowsRequestBody | FunnelRequestBody | undefined
}
