import {
  FlowsRequestBody,
  FunnelRequestBody,
  RetentionRequestBody,
} from '@/types'
import { AtlasError } from '@/types/AtlasError'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

type SQLResponse = { data: string } | { error: AtlasError }

interface SQLService {
  runSql: (query: string) => Promise<SQLResponse>
  runFunnel: (body: FunnelRequestBody) => Promise<SQLResponse>
  runFlows: (body: FlowsRequestBody) => Promise<SQLResponse>
  runRetention: (body: RetentionRequestBody) => Promise<SQLResponse>
}

type OptionalParam = {
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

  runFunnel = async (body: FunnelRequestBody) => {
    const query = `{{ dbt_product_analytics.funnel(steps=${JSON.stringify(
      body.steps,
    )}, event_stream=${body.eventStream}) }}`
    return this.runSql(query)
  }

  runFlows = async (body: FlowsRequestBody) => {
    const query = `{{ dbt_product_analytics.flows(event_stream=${
      body.eventStream
    }, primary_event=${JSON.stringify(
      body.primaryEvent,
    )}${optionalParamsToString([
      { name: `n_events_from`, param: body.nEventsFrom },
      { name: `before_or_after`, param: body.beforeOrAfter },
      { name: `top_n`, param: body.topN },
    ])}) }}`
    return this.runSql(query)
  }

  runRetention = async (body: RetentionRequestBody) => {
    const query = `{{ dbt_product_analytics.retention(event_stream=${
      body.eventStream
    }, first_action=${JSON.stringify(
      body.firstAction,
    )}, second_action=${JSON.stringify(
      body.secondAction,
    )}, start_date=${JSON.stringify(body.startDate)}, end_date=${JSON.stringify(
      body.endDate,
    )}${optionalParamsToString([
      { name: `periods`, param: body.periods },
      { name: `period_type`, param: body.periodType },
      { name: `group_by`, param: body.groupBy },
    ])}) }}`
    return this.runSql(query)
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export default new DbtSQLService(process.env.DBT_PROJECT_PATH)
