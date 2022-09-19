export type FunnelData = {
  event_type: string
  unique_users: number
  pct_conversion: number
  pct_of_previous: number | null
}[]
