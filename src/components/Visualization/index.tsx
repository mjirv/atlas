import { FlowsData, FunnelData, ReportType, RetentionData } from '@/types'
import Flows from './Flows'
import Funnel from './Funnel'
import Retention from './Retention'

const Visualization = ({
  reportType,
  data,
}: {
  reportType: ReportType
  data: FunnelData | FlowsData | RetentionData | undefined
}) => {
  switch (reportType) {
    case `funnel`: {
      return <Funnel data={data as FunnelData} />
    }
    case `flows`: {
      return <Flows data={data as FlowsData | undefined} />
    }
    case `retention`: {
      return <Retention data={data as RetentionData} />
    }
    default: {
      return <Funnel data={data as FunnelData} />
    }
  }
}

export default Visualization
