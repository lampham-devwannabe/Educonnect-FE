import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

const SelectField = ({
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
          ? options.map(options => (
              <SelectItem className="capitalize" key={options} value={options}>
                {options}
              </SelectItem>
            ))
          : options.map(option => (
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
