import {
  FlowsRequestBody,
  FunnelRequestBody,
  RetentionRequestBody,
} from '@/types'
import { EventStreamResponse } from '@/types/ApiResponse'

export type FormParams = {
  eventStreams: EventStreamResponse | undefined
  handleSubmit: (
    payload: FlowsRequestBody | FunnelRequestBody | RetentionRequestBody,
  ) => void
  query: FlowsRequestBody | FunnelRequestBody | RetentionRequestBody | undefined
}
