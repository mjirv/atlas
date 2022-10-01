import { EventStream, EventStreamRef } from '@/models/EventStream'
import DbtClient, { IDbtClient } from 'dbt_ts_client'

type DbtEventStreamResource = {
  alias: string
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
      const eventStreamsRaw = await this.client.ls({
        resourceType: `model`,
        select: `tag:event_stream`,
        output: `json`,
        outputKeys: `alias`,
      })

      console.info(eventStreamsRaw.split(`\n`))

      this.eventStreams = eventStreamsRaw
        .split(`\n`)
        .filter((eventStreamsRaw) => eventStreamsRaw !== ``)
        .map(
          (eventStreamRaw) =>
            new EventStreamRef({
              ref: (JSON.parse(eventStreamRaw) as DbtEventStreamResource).alias,
            }),
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
