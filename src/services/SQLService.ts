import { EventStream } from '@/models/EventStream'
import { AtlasError } from '@/types/AtlasError'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

type SQLResponse = { data: string } | { error: AtlasError }

interface FunnelParams {
  steps: Record<'event_type', string>[]
  eventStream: EventStream
}

interface SQLService {
  runSql: (query: string) => Promise<SQLResponse>
  runFunnel: (params: FunnelParams) => Promise<SQLResponse>
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
    return { data }
  }

  runFunnel = async (params: FunnelParams) => {
    const query = `{{ dbt_product_analytics.funnel(steps=${JSON.stringify(
      params.steps,
    )}, event_stream=${params.eventStream}) }}`
    return this.runSql(query)
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export default new DbtSQLService(process.env.DBT_PROJECT_PATH)
