import * as React from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface DobInputProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
}

const DobInput = React.forwardRef<HTMLDivElement, DobInputProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select your date of birth',
      className,
      disabled = false,
      required = false,
      label,
      error,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [tempDate, setTempDate] = React.useState({
      day: value?.getDate() || '',
      month: value ? value.getMonth() + 1 : '',
      year: value?.getFullYear() || '',
    })

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
    const months = [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
    ]

    const getDaysInMonth = (month: number, year: number) => {
      return new Date(year, month, 0).getDate()
    }

    const days =
      tempDate.month && tempDate.year
        ? Array.from(
            {
              length: getDaysInMonth(
                Number(tempDate.month),
                Number(tempDate.year)
              ),
            },
            (_, i) => i + 1
          )
        : Array.from({ length: 31 }, (_, i) => i + 1)

    const formatDisplayValue = () => {
      if (!value) return placeholder
      const day = value.getDate().toString().padStart(2, '0')
      const month = (value.getMonth() + 1).toString().padStart(2, '0')
      const year = value.getFullYear()
      return `${day}/${month}/${year}`
    }

    const handleDateChange = (field: 'day' | 'month' | 'year', val: string) => {
      const newTempDate = { ...tempDate, [field]: val }
      setTempDate(newTempDate)

      if (newTempDate.day && newTempDate.month && newTempDate.year) {
        const newDate = new Date(
          Number(newTempDate.year),
          Number(newTempDate.month) - 1,
          Number(newTempDate.day)
        )
        onChange?.(newDate)
      }
    }

    const handleClear = () => {
      setTempDate({ day: '', month: '', year: '' })
      onChange?.(null)
    }

    React.useEffect(() => {
      if (value) {
        setTempDate({
          day: value.getDate().toString(),
          month: (value.getMonth() + 1).toString(),
          year: value.getFullYear().toString(),
        })
      }
    }, [value])

    return (
      <div className="space-y-2" ref={ref} {...props}>
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Calendar Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>

          {/* Main Input Display */}
          <div
            className={cn(
              'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background',
              'pl-10 pr-10 cursor-pointer transition-colors duration-200',
              'border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-20',
              disabled && 'cursor-not-allowed opacity-50 bg-slate-50',
              error &&
                'border-red-300 focus-within:border-red-500 focus-within:ring-red-500',
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                !disabled && setIsOpen(!isOpen)
              }
            }}
          >
            <span
              className={cn(
                'flex-1 truncate',
                value ? 'text-slate-900' : 'text-slate-400'
              )}
            >
              {formatDisplayValue()}
            </span>
          </div>

          {/* Dropdown Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              className={cn(
                'h-4 w-4 text-slate-400 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>

          {/* Dropdown Panel */}
          {isOpen && !disabled && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50">
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Day Select */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Day
                    </label>
                    <select
                      value={tempDate.day}
                      onChange={e => handleDateChange('day', e.target.value)}
                      className="w-full h-8 px-2 text-sm border border-slate-200 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Month Select */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Month
                    </label>
                    <select
                      value={tempDate.month}
                      onChange={e => handleDateChange('month', e.target.value)}
                      className="w-full h-8 px-2 text-sm border border-slate-200 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Month</option>
                      {months.map(month => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Select */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Year
                    </label>
                    <select
                      value={tempDate.year}
                      onChange={e => handleDateChange('year', e.target.value)}
                      className="w-full h-8 px-2 text-sm border border-slate-200 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors duration-200"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors duration-200"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    )
  }
)

DobInput.displayName = 'DobInput'

export { DobInput }
