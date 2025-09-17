import React from 'react'
import { Textarea } from './ui/textarea'
import { SquarePlus } from 'lucide-react'
import { Label } from './ui/label'

interface TextareaListProps {
  label: string
  items: string[]
  setItems: (items: string[]) => void
  handleAddNew: () => void
}

const TextareaList: React.FC<TextareaListProps> = ({
  label,
  items,
  setItems,
  handleAddNew,
}) => {
  const handleChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <SquarePlus className="cursor-pointer" onClick={handleAddNew} />
      </div>

      {items.map((item, index) => (
        <Textarea
          key={index}
          required
          defaultValue={item}
          onChange={e => handleChange(index, e.target.value)}
          className="min-h-15"
        />
      ))}
    </div>
  )
}

export default TextareaList
