import { EventStream } from '@/models/EventStream'
import { AtlasError } from '@/types/AtlasError'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

type SQLResponse = { data: string } | { error: AtlasError }

interface FunnelParams {
  steps: Record<'event_type', string>[]
  eventStream: EventStream
}

interface FlowsParams {
  eventStream: EventStream
  primaryEvent: string
  nEventsFrom?: number
  beforeOrAfter?: 'before' | 'after'
  topN?: number
}

interface RetentionParams {
  eventStream: EventStream
  firstAction: string
  secondAction: string
  startDate?: Date
  periods?: number[]
  periodType?: string
  dimensions?: string
}

interface SQLService {
  runSql: (query: string) => Promise<SQLResponse>
  runFunnel: (params: FunnelParams) => Promise<SQLResponse>
  runFlows: (params: FlowsParams) => Promise<SQLResponse>
}

interface OptionalParam {
  name: string
  param: string | number | Date | number[] | undefined
}

const optionalParamToString = (param: OptionalParam) =>
  param.param ? `, ${param.name}=${JSON.stringify(param.param)}` : ``

const optionalParamsToString = (params: OptionalParam[]) => {
  return params.map((param) => optionalParamToString(param)).join(``)
}

class DbtSQLService implements SQLService {
  client: IDbtClient
  constructor(dbtProjectPath: string) {
    this.client = new DbtClient({ dbtProjectPath, quiet: true })
  }

  runSql = async (query: string) => {
    if (!query) {
      return { error: { status: 400 } }
    }
    const data = await this.client.runOperation({
      operation: `dbt_product_analytics._run_query`,
      args: { query },
    })
    return { data: JSON.parse(data) }
  }

  runFunnel = async (params: FunnelParams) => {
    const query = `{{ dbt_product_analytics.funnel(steps=${JSON.stringify(
      params.steps,
    )}, event_stream=${params.eventStream}) }}`
    return this.runSql(query)
  }

  runFlows = async (params: FlowsParams) => {
    const query = `{{ dbt_product_analytics.flows(event_stream=${
      params.eventStream
    }, primary_event=${JSON.stringify(
      params.primaryEvent,
    )}${optionalParamsToString([
      { name: `n_events_from`, param: params.nEventsFrom },
      { name: `before_or_after`, param: params.beforeOrAfter },
      { name: `top_n`, param: params.topN },
    ])}) }}`
    return this.runSql(query)
  }

  runRetention = async (params: RetentionParams) => {
    const query = `{{ dbt_product_analytics.retention(event_stream=${
      params.eventStream
    }, first_action=${JSON.stringify(
      params.firstAction,
    )}, second_action=${JSON.stringify(
      params.secondAction,
    )}${optionalParamsToString([
      { name: `start_date`, param: params.startDate },
      { name: `periods`, param: params.periods },
      { name: `period_type`, param: params.periodType },
      { name: `dimensions`, param: params.dimensions },
    ])}) }}`
    return this.runSql(query)
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export default new DbtSQLService(process.env.DBT_PROJECT_PATH)
