import sqlService from '@/services/SQLService'

interface EventStreamMacroParams {
  from: string
  eventTypeCol: string
  userIdCol: string
  dateCol: string
  startDate?: Date
  endDate?: Date
}

interface EventStreamRefParams {
  ref: string
}

export interface EventStream {
  toString: () => string
  getEventTypes: () => Promise<string[]>
}

async function getEventTypesForEventStream(ref: string) {
  const { data, error } = await sqlService.runSql(
    `select distinct event_type from {{ ${ref} }} order by 1`,
  )

  if (error) {
    throw new Error(`Unable to get event types for EventStream ${ref}`)
  }

  const eventTypes = data as Record<'event_type', string>[]
  return eventTypes.map((eventType) => eventType[`event_type`])
}

export class EventStreamMacro implements EventStream {
  from: string
  eventTypeCol: string
  userIdCol: string
  dateCol: string
  startDate?: Date
  endDate?: Date
  constructor(params: EventStreamMacroParams) {
    this.from = params.from
    this.eventTypeCol = params.eventTypeCol
    this.userIdCol = params.userIdCol
    this.dateCol = params.dateCol
    this.startDate = params.startDate
    this.endDate = params.endDate
  }

  toString() {
    return `dbt_product_analytics.event_stream(
        from=${this.from},
        event_type_col="${this.eventTypeCol}",
        user_id_col="${this.userIdCol}",
        date_col="${this.dateCol}",
        start_date=${
          this.startDate
            ? `"` + this.startDate.toISOString().split(`T`)[0] + `"`
            : `none`
        },
        end_date=${
          this.endDate
            ? `"` + this.endDate.toISOString().split(`T`)[0] + `"`
            : `none`
        }`
  }

  async getEventTypes() {
    return await getEventTypesForEventStream(this.toString())
  }
}

export class EventStreamRef implements EventStream {
  ref: string
  constructor(params: EventStreamRefParams) {
    this.ref = params.ref
  }

  toString() {
    return `ref('${this.ref}')`
  }

  async getEventTypes() {
    return await getEventTypesForEventStream(this.toString())
  }
}
