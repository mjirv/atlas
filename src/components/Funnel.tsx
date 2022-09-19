import { FunnelData } from '@/types/FunnelData'
import { ResponsiveFunnel, FunnelDatum } from '@nivo/funnel'
import { useMemo } from 'react'

const Funnel = ({ data }: { data: FunnelData }) => {
  const transformedData: FunnelDatum[] = useMemo(
    () =>
      data.map((datum) => ({
        id: datum.event_type,
        value: datum.unique_users,
        label: datum.event_type,
      })),
    [data],
  )

  return (
    <ResponsiveFunnel
      data={transformedData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      direction="horizontal"
      shapeBlending={0.38}
      valueFormat=">-.4s"
      colors={{ scheme: `spectral` }}
      borderWidth={20}
      borderColor={{ from: `color`, modifiers: [] }}
      labelColor={{
        from: `color`,
        modifiers: [[`darker`, 3]],
      }}
      beforeSeparatorLength={10}
      beforeSeparatorOffset={20}
      afterSeparatorLength={10}
      afterSeparatorOffset={20}
      currentPartSizeExtension={10}
      currentBorderWidth={40}
      motionConfig="wobbly"
    />
  )
}

export default Funnel
