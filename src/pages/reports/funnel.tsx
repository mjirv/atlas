import { DataTable } from '@/components/DataTable'
import { Spinner } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'

export default function Funnel() {
  const [data, setData] = useState(null)
  const [columns, setColumns] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const query = {
      eventStream: `ref('order_events')`,
      steps: [
        { event_type: `placed` },
        { event_type: `completed` },
        { event_type: `returned` },
      ],
    }
    const res = await fetch(`/api/query/funnel`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: `post`,
      body: JSON.stringify(query),
    })

    const { data } = await res.json()

    const columnHelper = createColumnHelper()
    const columns = Object.keys(data[0]).map((key) =>
      columnHelper.accessor(key, {
        cell: (info) => info.getValue(),
      }),
    )

    setData(data)
    setColumns(columns)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return isLoading || !data ? (
    <Spinner size="xl" />
  ) : (
    <DataTable columns={columns} data={data} />
  )
}
