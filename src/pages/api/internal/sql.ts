import type { NextApiRequest, NextApiResponse } from 'next'
import sqlService from '@/services/SQLService'

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!(req.method === `POST`)) {
    return res.status(405).end()
  }
  const { query } = req.body
  const { data, error } = await sqlService.run(query)
  if (error) {
    return res.status(error.status).end()
  }
  res.status(200).json({ data })
}
