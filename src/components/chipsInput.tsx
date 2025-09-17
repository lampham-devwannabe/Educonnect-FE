import { XMarkIcon } from '@heroicons/react/20/solid'
import { Label } from './ui/label'

interface ChipInputProps {
  label: string
  chips: string[]
  setChips: React.Dispatch<React.SetStateAction<string[]>>
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  maxChips: number
}

const ChipInput: React.FC<ChipInputProps> = ({
  label,
  chips,
  setChips,
  inputValue,
  setInputValue,
  maxChips,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      inputValue.trim() !== '' &&
      chips.length < maxChips
    ) {
      e.preventDefault()
      setChips([...chips, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleDelete = (chipToDelete: string) => {
    setChips(chips.filter(chip => chip !== chipToDelete))
  }

  return (
    <div className="grid gap-3">
      <Label>{label}</Label>
      <div className="flex col-span-3 text-sm flex-wrap items-center border p-2 rounded">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center px-3 py-1 bg-black text-white rounded-full mr-2 mb-2"
          >
            <span>{chip}</span>
            <button
              type="button"
              className="ml-2 bg-dark hover:bg-blue-800 text-white rounded-full p-1"
              onClick={() => handleDelete(chip)}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        {chips.length < maxChips && (
          <input
            className="flex-grow col-span-3 w-full text-sm px-2 py-1 border-none focus:ring-0 outline-none"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter"
          />
        )}
      </div>
    </div>
  )
}

export default ChipInput
