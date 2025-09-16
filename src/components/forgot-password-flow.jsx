'use client'

import React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Mail,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const handleEmailSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('email', email)

      const response = await fetch('/api/sendOTP', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.status === 200) {
        setStep('otp')
        toast({
          title: 'Verification code sent',
          description: 'Check your email for the 6-digit code',
        })
      } else {
        throw new Error(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send verification code. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleOtpSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const enteredOtp = otp.join('')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('otp', enteredOtp)

      const response = await fetch('/api/verify-OTP', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.status === 200) {
        setStep('reset')
        toast({
          title: 'Code verified',
          description: 'You can now reset your password',
        })
      } else {
        throw new Error(result.message || 'Invalid verification code')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Invalid verification code. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async e => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)

    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Clear stored data
      sessionStorage.removeItem('resetOtp')
      sessionStorage.removeItem('resetEmail')

      toast({
        title: 'Password reset successful',
        description: 'You can now login with your new password',
      })

      // Reset form
      setStep('email')
      setEmail('')
      setOtp(['', '', '', '', '', ''])
      setNewPassword('')
      setConfirmPassword('')

      router.push('/login')
    } catch (err) {
      setError('Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderEmailStep = () => (
    <Card className="w-full max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-purple-50/60" />
      <CardHeader className="text-center space-y-3 sm:space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
          <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Forgot Password?
        </CardTitle>
        <CardDescription className="text-gray-600 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
          Enter your email address and we&apos;ll send you a secure verification
          code
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <form onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-12 sm:h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl text-sm sm:text-base transition-all duration-300"
            />
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50/80 backdrop-blur-sm"
            >
              <AlertDescription className="text-red-700 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Send Verification Code</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
            >
              ← Back to Login
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderOtpStep = () => (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-blue-50/60" />
      <CardHeader className="text-center space-y-3 sm:space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Enter Verification Code
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-gray-800 break-all">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <form onSubmit={handleOtpSubmit} className="space-y-6 sm:space-y-8">
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-center text-lg sm:text-xl lg:text-2xl font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-lg sm:rounded-xl transition-all duration-300"
              />
            ))}
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50/80 backdrop-blur-sm"
            >
              <AlertDescription className="text-red-700 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-12 sm:h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
            disabled={otp.some(digit => !digit) || loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Code'
            )}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 text-sm">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <button
              type="button"
              onClick={() => handleEmailSubmit({ preventDefault: () => {} })}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              disabled={loading}
            >
              Resend Code
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderResetStep = () => (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-pink-50/60" />
      <CardHeader className="text-center space-y-3 sm:space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Reset Password
        </CardTitle>
        <CardDescription className="text-gray-600 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
          Create a strong new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <form onSubmit={handlePasswordReset} className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="newPassword"
              className="text-sm font-semibold text-gray-800"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="h-12 sm:h-14 pr-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-sm sm:text-base transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="h-12 sm:h-14 pr-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-sm sm:text-base transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50/80 backdrop-blur-sm"
            >
              <AlertDescription className="text-red-700 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-12 sm:h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Resetting...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep('otp')}
              className="flex items-center justify-center w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Verification
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90 z-10" />
          <img
            src="https://img.freepik.com/premium-vector/forgot-password-concept-illustration_114360-1095.jpg"
            alt="Security illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 xl:p-12">
            <div className="max-w-sm xl:max-w-md text-center space-y-4 xl:space-y-6">
              <div className="w-20 h-20 xl:w-24 xl:h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <Shield className="w-10 h-10 xl:w-12 xl:h-12 text-white" />
              </div>
              <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
                Secure Password Recovery
              </h2>
              <p className="text-lg xl:text-xl text-blue-100 leading-relaxed">
                Your account security is our top priority. We use advanced
                encryption and multi-factor authentication to keep your data
                safe.
              </p>
              <div className="flex items-center justify-center space-x-6 xl:space-x-8 pt-6 xl:pt-8">
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Mail className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-blue-100">
                    Email Verification
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-blue-100">
                    OTP Security
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-blue-100">
                    Secure Reset
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
            {step === 'email' && renderEmailStep()}
            {step === 'otp' && renderOtpStep()}
            {step === 'reset' && renderResetStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
