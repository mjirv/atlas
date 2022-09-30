import { RetentionData } from '@/types/'
import { ResponsiveLine, Serie } from '@nivo/line'
import { useMemo } from 'react'

const Retention = ({ data }: { data: RetentionData }) => {
  const transformedData: Serie[] = useMemo(() => {
    const dataToReturn = {} as Record<
      string,
      { x: number; y: number; unique_users: number }[]
    >
    data.forEach((datum) => {
      if (!dataToReturn[datum.dimension || `series`]) {
        dataToReturn[datum.dimension || `series`] = []
      }
      dataToReturn[datum.dimension || `series`].push({
        x: datum.period,
        y: datum.pct_users,
        unique_users: datum.unique_users,
      })
    })
    return Object.entries(dataToReturn).map(([key, data]) => ({
      id: key,
      data,
    }))
  }, [data])

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: `point` }}
      yScale={{
        type: `linear`,
        min: 0,
        max: 1,
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `transportation`,
        legendOffset: 36,
        legendPosition: `middle`,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `count`,
        legendOffset: -40,
        legendPosition: `middle`,
      }}
      pointSize={10}
      pointColor={{ theme: `background` }}
      pointBorderWidth={2}
      pointBorderColor={{ from: `serieColor` }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: `bottom-right`,
          direction: `column`,
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: `left-to-right`,
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: `circle`,
          symbolBorderColor: `rgba(0, 0, 0, .5)`,
          effects: [
            {
              on: `hover`,
              style: {
                itemBackground: `rgba(0, 0, 0, .03)`,
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default Retention
