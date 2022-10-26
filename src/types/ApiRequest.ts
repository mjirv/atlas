export type FunnelRequestBody = {
  steps: string[]
  eventStream: string
  startDate?: string
  endDate?: string
}

export type FlowsRequestBody = {
  eventStream: string
  primaryEvent: string
  nEventsFrom?: number
  beforeOrAfter?: 'before' | 'after'
  topN?: number
  startDate?: string
  endDate?: string
}

export type RetentionRequestBody = {
  eventStream: string
  firstAction: string
  secondAction: string
  startDate?: string
  endDate?: string
  periods?: number[]
  periodType?: string
  groupBy?: string
}
