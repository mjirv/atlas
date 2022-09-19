import { FlowsData } from '@/types/FlowsData'
import { ResponsiveSankey, DefaultNode, DefaultLink } from '@nivo/sankey'
import { useMemo } from 'react'

const Flows = ({ data }: { data: FlowsData }) => {
  const nodes: DefaultNode[] = useMemo(
    () =>
      data.flatMap((flow) =>
        Array.from(
          new Set(
            Object.values(flow).filter((value) => typeof value === `string`),
          ),
        ).map((value) => ({
          id: value as string,
        })),
      ),
    [data],
  )

  const links: DefaultLink[] = useMemo(() => {
    return []
  }, [])

  return (
    <ResponsiveSankey
      data={{ nodes, links }}
      margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      align="justify"
      colors={{ scheme: `category10` }}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.35}
      nodeThickness={18}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{
        from: `color`,
        modifiers: [[`darker`, 0.8]],
      }}
      nodeBorderRadius={3}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      linkContract={3}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{
        from: `color`,
        modifiers: [[`darker`, 1]],
      }}
      legends={[
        {
          anchor: `bottom-right`,
          direction: `column`,
          translateX: 130,
          itemWidth: 100,
          itemHeight: 14,
          itemDirection: `right-to-left`,
          itemsSpacing: 2,
          itemTextColor: `#999`,
          symbolSize: 14,
          effects: [
            {
              on: `hover`,
              style: {
                itemTextColor: `#000`,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default Flows
