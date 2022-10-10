import { FlowsData } from '@/types/FlowsData'
import { ResponsiveSankey, DefaultNode, DefaultLink } from '@nivo/sankey'
import { useMemo } from 'react'

const FlowsVisualization = ({ data }: { data: FlowsData }) => {
  /*
  [        
    {
        "event_0": "placed",
        "event_1": "completed",
        "event_2": "returned",
        "event_3": null,
        "event_4": null,
        "event_5": null,
        "n_events": 1
    }]
  */

  const links: DefaultLink[] = useMemo(() => {
    const linkObject = {} as Record<string, Record<string, number>>
    data.forEach((flow) => {
      const eventList = Object.entries(flow)
      eventList.forEach(([, event], index) => {
        if (typeof event === `number`) {
          return
        }
        if (event === null && index > 0 && eventList[index - 1][1] === null) {
          return
        }

        linkObject[`${index}. ${event}`] =
          linkObject[`${index}. ${event}`] || {}
        if (index > 0) {
          linkObject[`${index - 1}. ${eventList[index - 1][1]}`] =
            linkObject[`${index - 1}. ${eventList[index - 1][1]}`] || {}
          linkObject[`${index - 1}. ${eventList[index - 1][1]}`][
            `${index}. ${event}`
          ] =
            (linkObject[`${index - 1}. ${eventList[index - 1][1]}`][
              `${index}. ${event}`
            ] || 0) + flow.n_events
        }
      })
    })
    return Object.entries(linkObject).flatMap(([source, targets]) =>
      Object.entries(targets).map(([target, value]) => ({
        source,
        target,
        value,
      })),
    )
  }, [data])

  const nodes: DefaultNode[] = useMemo(
    () =>
      Array.from(
        new Set([
          ...links.map((link) => link.source),
          ...links.map((link) => link.target),
        ]),
      ).map((node) => ({
        id: node,
      })),
    [links],
  )

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

export default FlowsVisualization
