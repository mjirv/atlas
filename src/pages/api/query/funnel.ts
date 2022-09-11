import type { NextApiRequest, NextApiResponse } from 'next'
import sqlService from '@/services/SQLService'

type Data = {
  data: string
}

/**
 * 
 * @example curl --location --request POST 'http://localhost:3000/api/query/funnel' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "eventStream": "ref('\''order_events'\'')",
        "steps": [{ "event_type": "placed" }, { "event_type": "completed" }, { "event_type": "returned" }]
    }'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!(req.method === `POST`)) {
    return res.status(405).end()
  }
  const { steps, eventStream } = req.body
  const { data, error } = await sqlService.runFunnel({ steps, eventStream })
  if (error) {
    return res.status(error.status).end()
  }
  res.status(200).json({ data })
}
