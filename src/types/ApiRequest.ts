export type FunnelRequestBody = {
  steps: string[]
  eventStream: string
}

export type FlowsRequestBody = {
  eventStream: string
  primaryEvent: string
  nEventsFrom?: number
  beforeOrAfter?: 'before' | 'after'
  topN?: number
}

export type RetentionRequestBody = {
  eventStream: string
  firstAction: string
  secondAction: string
  startDate?: Date
  endDate?: Date
  periods?: number[]
  periodType?: string
  groupBy?: string
}
