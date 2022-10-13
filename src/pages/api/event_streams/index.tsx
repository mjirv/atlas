import { dbtEventStreamService } from '@/services/EventStreamService'
import { EventStreamResponse } from '@/types/ApiResponse'
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'

const redis = process.env.REDIS_URL
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : // eslint-disable-next-line @typescript-eslint/no-empty-function
    { get: () => {}, set: () => {}, connect: () => {}, on: () => {} }
redis.on(`error`, (err) => console.error(`Redis client error`, err))
redis.connect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventStreamResponse>,
) {
  if (!(req.method === `GET`)) {
    return res.status(405).end()
  }

  try {
    const cached = await redis.get(`eventStreams`)
    if (cached) {
      return res.status(200).json(JSON.parse(cached) as EventStreamResponse)
    }
    const eventStreams = await dbtEventStreamService.listEventStreams()
    const body = await Promise.all(
      eventStreams.map(async (eventStream) => ({
        eventStream: eventStream.toString(),
        eventTypes: await eventStream.getEventTypes(),
      })),
    )
    redis.set(`eventStreams`, JSON.stringify(body))
    return res.status(200).json(body)
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
