import { DataTable } from '@/components/DataTable'
import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  FunnelData,
  FlowsData,
  RetentionData,
  ReportType,
  FlowsRequestBody,
} from '@/types'
import MenuNav from '@/components/MenuNav'
import Visualization from '@/components/Visualization'
import CenteredSpinner from '@/components/Loading/CenteredSpinner'
import VisualizationForm from '@/components/VisualizationForm'
import { EventStreamContext } from '@/components/EventStreamsProvider'
import FormSkeleton from '@/components/Loading/FormSkeleton'

type Data = FunnelData | FlowsData | RetentionData

export default function Report() {
  const [data, setData] = useState<Data>()
  const [columns, setColumns] = useState<ColumnDef<Data[0]>[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { reportType, query: queryBase64 } = router.query
  const [query, setQuery] = useState<string>()
  const [queryObject, setQueryObject] = useState<FlowsRequestBody>()
  const eventStreams = useContext(EventStreamContext)

  const handleSubmit = useCallback(
    (payload: FlowsRequestBody) => {
      router.replace({
        query: {
          ...router.query,
          query: Buffer.from(JSON.stringify(payload)).toString(`base64`),
        },
      })
    },
    [router],
  )

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/query/${reportType}`, {
      headers: {
        'Content-Type': `application/json`,
      },
      method: `post`,
      body: query,
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
    query && fetchData()
  }, [fetchData, query])

  useEffect(() => {
    if (typeof queryBase64 === `string`) {
      const query = Buffer.from(queryBase64, `base64`).toString()
      setQuery(query)
      setQueryObject(JSON.parse(query))
    }
  }, [queryBase64])

  return (
    <Flex minHeight="100vh" flexDir="column" gap="10px">
      <MenuNav />
      {!!eventStreams ? (
        <VisualizationForm
          reportType={reportType as ReportType}
          query={queryObject}
          handleSubmit={handleSubmit}
          eventStreams={eventStreams}
        />
      ) : (
        <FormSkeleton />
      )}
      {(query || !eventStreams) &&
        (!isLoading && columns && data && eventStreams ? (
          <Box width="100%" height="100%">
            <Box
              style={{
                width: `100%`,
                height: `500px`,
                display: `block`,
              }}
            >
              <Visualization
                reportType={reportType as ReportType}
                data={data}
              />
            </Box>
            <DataTable columns={columns} data={data} />
          </Box>
        ) : (
          <CenteredSpinner />
        ))}
    </Flex>
  )
}
