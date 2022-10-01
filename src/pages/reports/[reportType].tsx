import { DataTable } from '@/components/DataTable'
import { Spinner } from '@chakra-ui/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FunnelData, FlowsData, RetentionData, ReportType } from '@/types'
import MenuNav from '@/components/MenuNav'
import Visualization from '@/components/Visualization'

type Data = FunnelData | FlowsData | RetentionData

export default function Report() {
  const [data, setData] = useState<Data>()
  const [columns, setColumns] = useState<ColumnDef<Data[0]>[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { reportType, query } = router.query

  const fetchData = useCallback(async () => {
    setLoading(true)
    const demoQueries = {
      funnel: {
        eventStream: `ref('order_events')`,
        steps: [
          { event_type: `placed` },
          { event_type: `completed` },
          { event_type: `returned` },
        ],
      },
      flows: {
        eventStream: `ref('order_events')`,
        primaryEvent: `placed`,
      },
      retention: {
        eventStream: `ref('order_events')`,
        firstAction: `completed`,
        secondAction: `completed`,
        startDate: `2018-01-17`,
      },
    }
    const reportQuery = query
      ? Buffer.from(query as string, `base64`).toString()
      : JSON.stringify(
          demoQueries[reportType as 'funnel' | 'flows' | 'retention'],
        )
    const res = await fetch(`/api/query/${reportType}`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: `post`,
      body: reportQuery,
    })

    const { data } = (await res.json()) as { data: Data }

    const columnHelper = createColumnHelper<Data[0]>()
    const columns = Object.keys(data[0]).map((key) =>
      columnHelper.accessor(key, {
        cell: (info) => info.getValue(),
      }),
    )

    setData(data)
    setColumns(columns)
    setLoading(false)
  }, [query, reportType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <MenuNav />
      <div
        style={{
          width: `100%`,
          height: `500px`,
          display: `block`,
        }}
      >
        <Visualization reportType={reportType as ReportType} data={data} />
      </div>
      {!isLoading && columns && data && (
        <DataTable columns={columns} data={data} />
      )}
    </>
  )
}
