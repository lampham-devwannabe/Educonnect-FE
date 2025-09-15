
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from 'lucide-react'
import { Switch } from "@/components/ui/switch"


export function WithdrawGatewayList({ gateways, onEdit, onDelete, onToggleStatus, onView }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Required Fields</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gateways.map((gateway) => (
          <TableRow key={gateway.id}>
            <TableCell>{gateway.name}</TableCell>
            <TableCell>{gateway.requiredFields.length}</TableCell>
            <TableCell>
              <Badge
                variant={gateway.status === "Active" ? "success" : "secondary"}
                className="cursor-pointer"
                onClick={() => onToggleStatus(gateway._id)}
              >
                {gateway.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onView(gateway)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(gateway)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(gateway._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                
              </div>
            </TableCell>

            <TableCell className="text-right">
                  <Switch
                    checked={gateway.status === "Active"? true : false}
                    onCheckedChange={() => onToggleStatus(gateway._id)}
                    aria-label={`Toggle ${gateway.name} active status`}
                  />
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

