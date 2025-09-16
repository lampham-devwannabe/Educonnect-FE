import { Badge } from '@/components/ui/badge'

const statusColors = {
  Pending: 'yellow',
  Approved: 'blue',
  Rejected: 'destructive',
  Processing: 'secondary',
  Completed: 'green',
}

export function StatusBadge({ status }) {
  return <Badge variant={statusColors[status]}>{status}</Badge>
}
