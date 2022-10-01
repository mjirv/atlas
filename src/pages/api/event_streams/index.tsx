import { dbtEventStreamService } from '@/services/EventStreamService'
import { EventStreamResponse } from '@/types/ApiResponse'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventStreamResponse>,
) {
  if (!(req.method === `GET`)) {
    return res.status(405).end()
  }

  try {
    const eventStreams = await dbtEventStreamService.listEventStreams()
    const body = await Promise.all(
      eventStreams.map(async (eventStream) => ({
        eventStream: eventStream.toString(),
        eventTypes: await eventStream.getEventTypes(),
      })),
    )
    return res.status(200).json(body)
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
