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
import { PlusCircle, X } from 'lucide-react'

export function RequiredFieldsEditor({ fields, onChange }) {
  const addField = () => {
    onChange([...fields, { fieldName: '', fieldType: 'string' }])
  }

  const updateField = (index, field) => {
    const newFields = [...fields]
    newFields[index] = field
    onChange(newFields)
  }

  const removeField = index => {
    onChange(fields.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-5 space-x-2">
      <Label>Required Fields</Label>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={field.fieldName}
            onChange={e =>
              updateField(index, { ...field, fieldName: e.target.value })
            }
            placeholder="Field Name"
          />
          <Select
            value={field.fieldType}
            onValueChange={value =>
              updateField(index, { ...field, fieldType: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Field Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeField(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addField}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Field
      </Button>
    </div>
  )
}
