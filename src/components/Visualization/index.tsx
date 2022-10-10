import { FlowsData, FunnelData, ReportType, RetentionData } from '@/types'
import { Flex } from '@chakra-ui/react'
import Flows from './Flows'
import Funnel from './Funnel'
import Retention from './Retention'

type Props = {
  reportType: ReportType
  data: FunnelData | FlowsData | RetentionData
}

const Visualization = ({ reportType, data }: Props) => {
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

const ResponsiveVisualization = (props: Props) => (
  <Flex
    height={`500px`}
    minWidth="100%"
    flexDirection="column"
    flexShrink="none"
  >
    <Visualization {...props} />
  </Flex>
)

export default ResponsiveVisualization
