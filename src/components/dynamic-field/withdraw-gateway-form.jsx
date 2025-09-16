import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RequiredFieldsEditor } from './required-fields-editor'

export function WithdrawGatewayForm({ gateway, onSave, onCancel }) {
  const [name, setName] = useState(gateway?.name || '')
  const [requiredFields, setRequiredFields] = useState(
    gateway?.requiredFields || []
  )
  const [status, setStatus] = useState(gateway?.status || 'Active')

  useEffect(() => {
    if (gateway) {
      setName(gateway.name)
      setRequiredFields(gateway.requiredFields)
      setStatus(gateway.status)
    }
  }, [gateway])

  const handleSubmit = e => {
    e.preventDefault()
    onSave({
      id: gateway?.id || '',
      name,
      requiredFields,
      status,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <RequiredFieldsEditor
        fields={requiredFields}
        onChange={setRequiredFields}
      />
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={value => setStatus(value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
