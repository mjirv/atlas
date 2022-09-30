import { EventStream, EventStreamRef } from '@/models/EventStream'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

type DbtEventStreamResource = {
  name: string
}

interface EventStreamService {
  listEventStreams: () => Promise<EventStream[]>
}

class DbtEventStreamService implements EventStreamService {
  private client: IDbtClient
  private eventStreams: EventStream[]
  constructor(dbtProjectPath: string) {
    this.client = new DbtClient({ dbtProjectPath, quiet: true })
    this.eventStreams = []
  }

  async listEventStreams() {
    if (this.eventStreams.length === 0) {
      const eventStreamRefs = JSON.parse(
        await this.client.ls({
          resourceType: `model`,
          select: `tag:dbt_product_analytics`,
        }),
      ) as DbtEventStreamResource[]
      this.eventStreams = eventStreamRefs.map(
        (eventStream) => new EventStreamRef({ ref: eventStream.name }),
      )
    }
    return this.eventStreams
  }
}

if (!process.env.DBT_PROJECT_PATH) {
  throw new Error(`env var DBT_PROJECT_PATH must be provided`)
}

export const dbtEventStreamService = new DbtEventStreamService(
  process.env.DBT_PROJECT_PATH,
)
