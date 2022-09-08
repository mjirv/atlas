import { AtlasError } from '@/types/AtlasError'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

interface SQLService {
  sqlQuery: (query: string) => Promise<{ data: string } | { error: AtlasError }>
}

class DbtSQLService implements SQLService {
  client: IDbtClient
  constructor(dbtProjectPath: string) {
    this.client = new DbtClient({ dbtProjectPath })
  }

  sqlQuery = async (query: string) => {
    if (!query) {
      return { error: { status: 400 } }
    }
    const data = await this.client.runOperation({
      operation: `dbt_product_analytics._run_query`,
      args: { query },
    })
    return { data }
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export default new DbtSQLService(process.env.DBT_SQL_PATH as string)
