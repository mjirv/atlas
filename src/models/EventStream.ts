interface EventStreamParams {
  from: string
  eventTypeCol: string
  userIdCol: string
  dateCol: string
  startDate?: Date
  endDate?: Date
}

export class EventStream {
  from: string
  eventTypeCol: string
  userIdCol: string
  dateCol: string
  startDate?: Date
  endDate?: Date
  constructor(params: EventStreamParams) {
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
}
