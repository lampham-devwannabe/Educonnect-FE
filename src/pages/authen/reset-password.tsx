import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next' // ← Add this import
import { ArrowLeft, KeyRound, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/password-input'
import logo from '@/assets/icon/logo.png'

export interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation() // ← Add this hook

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      toast.error(t('resetPasswordPage.invalidToken')) // ← Use translation
      navigate('/forgot-password')
    }
  }, [token, navigate, t])

  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push(t('resetPasswordPage.atLeast8Characters')) // ← Use translation
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('resetPasswordPage.oneLowercaseLetter')) // ← Use translation
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('resetPasswordPage.oneUppercaseLetter')) // ← Use translation
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push(t('resetPasswordPage.oneNumber')) // ← Use translation
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('resetPasswordPage.oneSpecialCharacter')) // ← Use translation
    }

    let color = 'bg-red-500'
    if (score >= 3) color = 'bg-yellow-500'
    if (score >= 4) color = 'bg-green-500'

    return { score, feedback, color }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (password !== confirmPassword) {
      toast.error(t('resetPasswordPage.passwordsDoNotMatch')) // ← Use translation
      setIsSubmitting(false)
      return
    }

    const passwordStrength = checkPasswordStrength(password)
    if (passwordStrength.score < 3) {
      toast.error(t('resetPasswordPage.passwordTooWeak')) // ← Use translation
      setIsSubmitting(false)
      return
    }

    const toastId = toast.loading(t('resetPasswordPage.resettingPassword')) // ← Use translation

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.dismiss(toastId)
      toast.success(t('resetPasswordPage.passwordResetSuccess')) // ← Use translation

      // Redirect to login after success
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(t('resetPasswordPage.passwordResetFailed')) // ← Use translation
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordStrength = checkPasswordStrength(password)

  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-800 opacity-90" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-white/5 backdrop-blur-xl rounded-b-[100px] transform -skew-y-2" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/5 backdrop-blur-xl rounded-t-[100px] transform skew-y-2" />

        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-12 text-white">
          <div className="mb-8 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
              <img
                src={logo}
                alt={`${t('resetPasswordPage.smartAcademy')} Logo`} // ← Use translation
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">
              {t('resetPasswordPage.createSecurePassword')}{' '}
              {/* ← Use translation */}
            </h2>
            <p className="text-white/80">
              {t('resetPasswordPage.createSecurePasswordDesc')}{' '}
              {/* ← Use translation */}
            </p>
          </div>

          {/* Illustration */}
          <div className="mt-8 relative">
            <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
              <KeyRound className="w-24 h-24 text-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <div className="flex justify-center mb-6">
              <a href="/" className="inline-block">
                <img
                  src={logo}
                  alt={`${t('resetPasswordPage.smartAcademy')} Logo`} // ← Use translation
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {t('resetPasswordPage.title')} {/* ← Use translation */}
            </h1>
            <p className="mt-2 text-slate-600">
              {t('resetPasswordPage.subtitle')} {/* ← Use translation */}
            </p>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    {t('resetPasswordPage.newPassword')}{' '}
                    {/* ← Use translation */}
                  </Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('resetPasswordPage.newPasswordPlaceholder')} // ← Use translation
                    className="bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2 space-y-2">
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
                            ? t('resetPasswordPage.passwordStrengthWeak') // ← Use translation
                            : passwordStrength.score < 4
                              ? t('resetPasswordPage.passwordStrengthGood') // ← Use translation
                              : t(
                                  'resetPasswordPage.passwordStrengthStrong'
                                )}{' '}
                          {/* ← Use translation */}
                        </span>
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <p className="font-medium mb-1">
                            {t('resetPasswordPage.passwordMustInclude')}{' '}
                            {/* ← Use translation */}
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-slate-700"
                  >
                    {t('resetPasswordPage.confirmPassword')}{' '}
                    {/* ← Use translation */}
                  </Label>
                  <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder={t(
                      'resetPasswordPage.confirmPasswordPlaceholder'
                    )} // ← Use translation
                    className="bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      {password === confirmPassword ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">
                            {t('resetPasswordPage.passwordsMatch')}{' '}
                            {/* ← Use translation */}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-600">
                            {t('resetPasswordPage.passwordsDontMatch')}{' '}
                            {/* ← Use translation */}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword ||
                    passwordStrength.score < 3
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md transition-all duration-200"
                >
                  {isSubmitting
                    ? t('resetPasswordPage.resettingPassword')
                    : t('resetPasswordPage.resetPassword')}{' '}
                  {/* ← Use translation */}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('resetPasswordPage.backToLogin')} {/* ← Use translation */}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
