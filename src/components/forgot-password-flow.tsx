import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CheckCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createHttp } from '@/services/httpFactory'

type Step = 'email' | 'success'

interface ForgotPasswordResponse {
  status: number
  code?: number
  message?: string
  data?: {
    resetToken?: string
  }
}

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState<string>('')
  const [resetToken, setResetToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  // Create HTTP client
  const api = createHttp('http://139.59.97.252:8080')

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        {
          email: email,
        }
      )

      if (response.data.code === 1000) {
        // Store reset token if provided by API
        if (response.data.data?.resetToken) {
          setResetToken(response.data.data.resetToken)
        }

        setStep('success')
        toast.success('Password reset link sent to your email')
      } else {
        throw new Error(response.data.message || 'Failed to send reset link')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to send password reset link. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        {
          email: email,
        }
      )

      if (response.data.code === 1000) {
        // Store reset token if provided by API
        if (response.data.data?.resetToken) {
          setResetToken(response.data.data.resetToken)
        }

        toast.success('Password reset link sent again to your email')
      } else {
        throw new Error(response.data.message || 'Failed to send reset link')
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to send password reset link. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleRedirectToReset = () => {
    if (resetToken) {
      // Redirect to reset password page with token
      navigate(`/reset-password?token=${resetToken}`)
    } else {
      // If no token, show message to check email
      toast('Please check your email for the reset link')
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
          Enter your email address and we'll send you a secure password reset
          link
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
            <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
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
                <span>Send Reset Link</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderSuccessStep = () => (
    <Card className="w-full max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-blue-50/60" />
      <CardHeader className="text-center space-y-3 sm:space-y-4 relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Check Your Email
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
          We've sent a password reset link to{' '}
          <span className="font-semibold text-gray-800 break-all">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                  What's next?
                </h3>
                <ul className="text-blue-700 text-xs sm:text-sm space-y-1">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create your new password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>
            </div>
          </div>

          {resetToken && (
            <Button
              onClick={handleRedirectToReset}
              className="w-full h-12 sm:h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
            >
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Reset Password Now</span>
              </div>
            </Button>
          )}

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
              onClick={handleResendEmail}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              disabled={loading}
            >
              Resend Email
            </button>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium hover:underline transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
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
                <Mail className="w-10 h-10 xl:w-12 xl:h-12 text-white" />
              </div>
              <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
                Secure Password Recovery
              </h2>
              <p className="text-lg xl:text-xl text-blue-100 leading-relaxed">
                Your account security is our top priority. We'll send you a
                secure reset link to your email address.
              </p>
              <div className="flex items-center justify-center space-x-6 xl:space-x-8 pt-6 xl:pt-8">
                <div className="text-center">
                  <div className="w-10 h-10 xl:w-12 xl:h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <Mail className="w-5 h-5 xl:w-6 xl:h-6" />
                  </div>
                  <p className="text-xs xl:text-sm text-blue-100">Email Link</p>
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
            {step === 'success' && renderSuccessStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
