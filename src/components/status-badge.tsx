import React from 'react'
import { Badge } from './ui/badge'
import { badgeVariants } from './ui/badgeVariants'
import type { VariantProps } from 'class-variance-authority'

type Status = 'Pending' | 'Approved' | 'Rejected' | 'Processing' | 'Completed'

interface StatusBadgeProps {
  status: Status
}

// Use the actual variant type from badgeVariants
type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

// Now statusColors maps to valid badge variants
const statusColors: Record<Status, BadgeVariant> = {
  Pending: 'yellow',
  Approved: 'blue',
  Rejected: 'destructive',
  Processing: 'secondary',
  Completed: 'green',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <Badge variant={statusColors[status]}>{status}</Badge>
}

export default StatusBadge
