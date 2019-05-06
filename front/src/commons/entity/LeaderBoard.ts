export default interface LeaderBoardEntity {
  codename: string
  default_metrics: string
  extract_output: object
  extract_schema: string[]
  id: number
  main_score: number
  method_description: string
  method_name: string
  name: string
  output: string
  project_url: string
  publication_url: string
  schema: { labels: any[]; default_order_by: string }
  submission_number: number
  submitted_at: string
  team_name: string
  title: string
}
