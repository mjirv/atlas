import { FlowsRequestBody, ReportType } from '@/types'
import FlowsForm from './FlowsForm'

type Props = {
  reportType: ReportType
  handleSubmit: (payload: FlowsRequestBody) => void
  query: FlowsRequestBody | undefined
}

const VisualizationForm = ({ reportType, handleSubmit, query }: Props) => {
  switch (reportType) {
    case `flows`: {
      return <FlowsForm handleSubmit={handleSubmit} query={query} />
    }
    default: {
      return <FlowsForm handleSubmit={handleSubmit} query={query} />
    }
  }
}

export default VisualizationForm
