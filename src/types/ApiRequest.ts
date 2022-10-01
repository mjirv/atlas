import { EventStream } from '@/models/EventStream'

export type FunnelRequestBody = {
  steps: Record<'event_type', string>[] //TODO: change this to just string and update dbt_product_analytics to match
  eventStream: EventStream
}

export type FlowsRequestBody = {
  eventStream: string
  primaryEvent: string
  nEventsFrom?: number
  beforeOrAfter?: 'before' | 'after'
  topN?: number
}

export type RetentionRequestBody = {
  eventStream: EventStream
  firstAction: string
  secondAction: string
  startDate?: Date
  endDate?: Date
  periods?: number[]
  periodType?: string
  groupBy?: string
}
