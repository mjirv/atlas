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

interface SQLService {
  runSql: (query: string) => Promise<SQLResponse>
  runFunnel: (params: FunnelParams) => Promise<SQLResponse>
  runFlows: (params: FlowsParams) => Promise<SQLResponse>
}

const optionalParamToString = (
  param_name: string,
  param: string | number | undefined,
) => (param ? `, ${param_name}=${JSON.stringify(param)}` : ``)

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
    return { data }
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
    )}${optionalParamToString(
      `n_events_from`,
      params.nEventsFrom,
    )}${optionalParamToString(
      `before_or_after`,
      params.beforeOrAfter,
    )}${optionalParamToString(`top_n`, params.topN)}) }}`
    return this.runSql(query)
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export default new DbtSQLService(process.env.DBT_PROJECT_PATH)
