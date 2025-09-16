import { Textarea } from '@/components/ui/textarea'
import { SquarePlus } from 'lucide-react'
import { Label } from '@/components/ui/label'

const TextareaList = ({ label, items, setItems, handleAddNew }) => {
  const handleChange = (index, value) => {
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

      {items.map(
        (requirement, index) => (
          console.log(requirement),
          (
            <Textarea
              key={index}
              required
              defaultValue={requirement}
              onChange={e => handleChange(index, e.target.value)}
              className="min-h-15"
            />
          )
        )
      )}
    </div>
  )
}
export default TextareaList
