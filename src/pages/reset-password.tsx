import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Shield, CheckCircle, Lock, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createHttp } from '@/services/httpFactory'

interface ResetPasswordResponse {
  status: number
  code?: number
  message?: string
}

export interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [tokenValid, setTokenValid] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get('token')
  const api = createHttp('http://139.59.97.252:8080')

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      toast.error('Invalid or missing reset token')
    }
  }, [token])

  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('At least 8 characters')
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('One lowercase letter')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('One uppercase letter')
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push('One number')
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push('One special character')
    }

    let color = 'bg-red-500'
    if (score >= 3) color = 'bg-yellow-500'
    if (score >= 4) color = 'bg-green-500'

    return { score, feedback, color }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Invalid or missing reset token')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const passwordStrength = checkPasswordStrength(newPassword)
    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please follow the requirements below.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        {
          token: token,
          newPassword: newPassword,
        }
      )

      if (response.data.code === 1000) {
        setSuccess(true)
        toast.success('Password reset successful!')

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        throw new Error(response.data.message || 'Failed to reset password')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to reset password. Please try again.'

      if (err.response?.status === 400 || err.response?.status === 401) {
        setTokenValid(false)
        setError(
          'Invalid or expired reset token. Please request a new reset link.'
        )
      } else {
        setError(errorMessage)
      }

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = checkPasswordStrength(newPassword)

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-gray-600">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/forgot-password')}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl"
            >
              Request New Reset Link
            </Button>
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                ← Back to Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Password Reset Successful!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your password has been successfully updated. You can now sign in
              with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-700 text-sm text-center">
                Redirecting to login page in 3 seconds...
              </p>
            </div>
            <Button
              onClick={() => navigate('/login')}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl"
            >
              Go to Login Now
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-700/90 z-10" />
          <img
            src="https://img.freepik.com/premium-vector/password-reset-concept-illustration_114360-7434.jpg"
            alt="Password reset illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 xl:p-12">
            <div className="max-w-sm xl:max-w-md text-center space-y-4 xl:space-y-6">
              <div className="w-20 h-20 xl:w-24 xl:h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <Shield className="w-10 h-10 xl:w-12 xl:h-12 text-white" />
              </div>
              <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
                Create New Password
              </h2>
              <p className="text-lg xl:text-xl text-purple-100 leading-relaxed">
                Choose a strong password to keep your account secure. Your new
                password should be unique and memorable.
              </p>
              <div className="flex items-center justify-center space-x-6 xl:space-x-8 pt-6 xl:pt-8">
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-purple-100">Secure</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-purple-100">
                    Protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <Card className="w-full max-w-md sm:max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-blue-50/60" />
            <CardHeader className="text-center space-y-3 sm:space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Reset Password
              </CardTitle>
              <CardDescription className="text-gray-600 text-base sm:text-lg leading-relaxed px-2 sm:px-0">
                Create a strong new password for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-semibold text-gray-800"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <PasswordInput
                      id="newPassword"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      showIcon={false}
                      className="h-12 sm:h-14 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-sm sm:text-base transition-all duration-300"
                    />
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {passwordStrength.score < 3
                            ? 'Weak'
                            : passwordStrength.score < 4
                              ? 'Good'
                              : 'Strong'}
                        </span>
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <p className="font-medium mb-1">
                            Password must include:
                          </p>
                          <ul className="space-y-0.5">
                            {passwordStrength.feedback.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center space-x-1"
                              >
                                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Confirm Password
                  </Label>
                  <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    showIcon={false}
                    className="h-12 sm:h-14 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-sm sm:text-base transition-all duration-300"
                  />

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="flex items-center space-x-2 text-xs">
                      {newPassword === confirmPassword ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">
                            Passwords match
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-600">
                            Passwords don't match
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="text-red-700 text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
                  disabled={
                    loading ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword
                  }
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Update Password</span>
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
