import * as React from 'react'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'right'
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      label,
      error,
      showIcon = true,
      iconPosition = 'left',
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Password Icon (Left) */}
          {showIcon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <KeyRound className="h-5 w-5 text-slate-400" />
            </div>
          )}

          {/* Password Input */}
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background',
              'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 focus:outline-none',
              'placeholder:text-slate-400 transition-colors duration-200',
              showIcon && iconPosition === 'left' && 'pl-10',
              'pr-10', // Always add right padding for the toggle button
              disabled && 'cursor-not-allowed opacity-50 bg-slate-50',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {/* Password Icon (Right) */}
          {showIcon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <KeyRound className="h-5 w-5 text-slate-400" />
            </div>
          )}

          {/* Toggle Password Visibility Button */}
          <button
            type="button"
            className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-3',
              'text-slate-400 hover:text-slate-600 transition-colors duration-200',
              'focus:outline-none focus:text-indigo-600',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            onClick={togglePasswordVisibility}
            disabled={disabled}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
