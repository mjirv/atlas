import { DataTable } from '@/components/DataTable'
import { Spinner } from '@chakra-ui/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Funnel from '@/components/Funnel'
import { useRouter } from 'next/router'
import Flows from '@/components/Flows'
import Retention from '@/components/Retention'
import { FunnelData, FlowsData, RetentionData } from '@/types'

type Data = FunnelData | FlowsData | RetentionData

export default function Report() {
  const [data, setData] = useState<Data | null>(null)
  const [columns, setColumns] = useState<ColumnDef<Data[0]>[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { reportType } = router.query

  const fetchData = useCallback(async () => {
    setLoading(true)
    const query = {
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
    const res = await fetch(`/api/query/${reportType}`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: `post`,
      body: JSON.stringify(query[reportType as 'funnel' | 'flows']),
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
  }, [reportType])

  const Visualization = useMemo(() => {
    return function Visualization() {
      switch (reportType) {
        case `funnel`: {
          return <Funnel data={data as FunnelData} />
        }
        case `flows`: {
          return <Flows data={data as FlowsData} />
        }
        case `retention`: {
          return <Retention data={data as RetentionData} />
        }
        default: {
          return <Funnel data={data as FunnelData} />
        }
      }
    }
  }, [data, reportType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return isLoading || !data || !columns ? (
    <Spinner size="xl" />
  ) : (
    <>
      <div
        style={{
          width: `100%`,
          height: `500px`,
          display: `block`,
        }}
      >
        <Visualization />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  )
}
