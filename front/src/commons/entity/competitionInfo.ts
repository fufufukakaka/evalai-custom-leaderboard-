export default interface CompetitionInfoEntity {
  codename: string
  default_metrics: string
  extract_schema: string[]
  id: number
  is_past: number
  name: string
  schema: { labels: any[]; default_order_by: string }
  start_date: string
  end_date: string
  title: string
}
