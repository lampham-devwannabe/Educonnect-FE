import React from 'react'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Option {
  _id: string
  [key: string]: string
}

interface SelectFieldProps {
  label: string
  options: string[] | Option[]
  value: string
  field: string
  onChange: (value: string) => void
  placeholder?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  field,
  onChange,
  placeholder,
}) => (
  <div className="grid gap-3">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={`Select ${label}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {field === ''
          ? (options as string[]).map(option => (
              <SelectItem className="capitalize" key={option} value={option}>
                {option}
              </SelectItem>
            ))
          : (options as Option[]).map(option => (
              <SelectItem
                className="capitalize"
                key={option._id}
                value={option._id}
              >
                {option[field]}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  </div>
)

export default SelectField
