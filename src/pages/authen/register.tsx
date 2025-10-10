import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next' // ← Add this import
import {
  AtSign,
  Phone,
  Briefcase,
  User,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import logo from '@/assets/icon/logo.png'
import { DobInput } from '@/components/ui/dob-input'
import { PasswordInput } from '@/components/ui/password-input'

import { useAuth, type RegisterFormData } from '@/providers/AuthProvider'
import type { PasswordStrength } from './reset-password'

export default function Register() {
  const [activeTab, setActiveTab] = useState('student')
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('') // ← Thêm state này
  const { t } = useTranslation() // ← Add this hook

  const handleTabChange = (value: any) => {
    setActiveTab(value)
  }

  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push(t('registerPage.atLeast8Characters')) // ← Use translation
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('registerPage.oneLowercaseLetter')) // ← Use translation
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('registerPage.oneUppercaseLetter')) // ← Use translation
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push(t('registerPage.oneNumber')) // ← Use translation
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push(t('registerPage.oneSpecialCharacter')) // ← Use translation
    }

    let color = 'bg-red-500'
    if (score >= 3) color = 'bg-yellow-500'
    if (score >= 4) color = 'bg-green-500'

    return { score, feedback, color }
  }

  const registerUser = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Prepare the data object for API call
      const userData: RegisterFormData = {
        firstName: (formData.get('firstName') as string)?.trim() || '',
        lastName: (formData.get('lastName') as string)?.trim() || '',
        username: (formData.get('userName') as string)?.trim() || '',
        email: (formData.get('email') as string)?.trim() || '',
        password: (formData.get('password') as string)?.trim() || '',
        phoneNumber: (formData.get('phone') as string)?.trim() || '',
        address: (formData.get('address') as string)?.trim() || '',
        dob: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : null,
        roleName: activeTab === 'student' ? 'Student' : 'Teacher',
        loginType: '',
      }

      if (password !== confirmPassword) {
        toast.error(t('registerPage.passwordsDoNotMatch')) // ← Use translation
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        toast.error(t('registerPage.validEmailRequired')) // ← Use translation
        return
      }

      // Validate password strength
      const passwordStrength = checkPasswordStrength(userData.password)
      if (passwordStrength.score < 3) {
        toast.error(t('registerPage.passwordTooWeak')) // ← Use translation
        return
      }

      const toastId = toast.loading(t('registerPage.creatingYourAccount')) // ← Use translation

      // Make API call
      const response = await register(userData)

      toast.dismiss(toastId)

      if (response) {
        toast.success(t('registerPage.accountCreatedSuccess')) // ← Use translation
        navigate('/login')
      } else {
        throw new Error('Registration failed')
      }
    } catch (error: any) {
      console.error('Registration error:', error)

      let errorMessage = t('registerPage.registrationFailed') // ← Use translation

      // Handle different types of errors with translations
      if (error.response?.status === 400) {
        errorMessage =
          error.response.data?.message || t('registerPage.invalidDataProvided')
      } else if (error.response?.status === 409) {
        errorMessage = t('registerPage.accountAlreadyExists')
      } else if (error.response?.status === 422) {
        errorMessage = t('registerPage.checkInputData')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.dismissAll()
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordStrength = checkPasswordStrength(password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col md:flex-row">
      {/* Left side - Enhanced visual section */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-800 opacity-90" />

        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-white/5 backdrop-blur-xl rounded-b-[100px] transform -skew-y-3" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-white/5 backdrop-blur-xl rounded-t-[100px] transform skew-y-3" />

        {/* Floating circles */}
        <div
          className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-purple-400/20 backdrop-blur-sm animate-pulse"
          style={{ animationDuration: '7s' }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-indigo-400/20 backdrop-blur-sm animate-pulse"
          style={{ animationDuration: '5s' }}
        />
        <div
          className="absolute top-2/3 left-1/4 w-24 h-24 rounded-full bg-pink-400/20 backdrop-blur-sm animate-pulse"
          style={{ animationDuration: '8s' }}
        />

        {/* Content container */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-12 text-white">
          {/* Logo and branding */}
          <div className="mb-8 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 transform rotate-3">
              <img
                src={logo}
                alt={`${t('registerPage.smartAcademy')} Logo`} // ← Use translation
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          {/* Main illustration with enhanced styling */}
          <div className="relative mb-8 w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl transform rotate-3" />
            <div className="relative p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <img
                src="https://assets-v2.lottiefiles.com/a/a8c181f0-1172-11ee-93a8-b71a96f7e386/ph8ljmXOOm.gif"
                alt="Education illustration"
                width={800}
                height={800}
                className="object-contain w-full rounded-xl"
              />
            </div>
          </div>

          {/* Testimonial or tagline */}
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">
              {t('registerPage.unlockPotential')} {/* ← Use translation */}
            </h2>
            <p className="text-white/80">
              {t('registerPage.joinCommunity')} {/* ← Use translation */}
            </p>

            {/* Testimonial */}
            <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="italic text-white/90">
                {t('registerPage.testimonial')} {/* ← Use translation */}
              </p>
              <div className="mt-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">
                  {t('registerPage.testimonialAuthor')}{' '}
                  {/* ← Use translation */}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-around w-full max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-xs text-white/70">
                {t('registerPage.studentsCount')}
              </div>{' '}
              {/* ← Use translation */}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs text-white/70">
                {t('registerPage.instructorsCount')}
              </div>{' '}
              {/* ← Use translation */}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-xs text-white/70">
                {t('registerPage.coursesCount')}
              </div>{' '}
              {/* ← Use translation */}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <a href="/" className="inline-block">
                <img
                  src={logo}
                  alt={`${t('registerPage.smartAcademy')} Logo`} // ← Use translation
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </a>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {t('registerPage.title')} {/* ← Use translation */}
            </h1>
            <p className="mt-2 text-slate-600">
              {t('registerPage.subtitle')} {/* ← Use translation */}
            </p>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4"></CardHeader>

            <CardContent>
              <form onSubmit={registerUser} className="space-y-5">
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        {t('registerPage.email')} {/* ← Use translation */}
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AtSign className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('registerPage.emailPlaceholder')} // ← Use translation
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="userName"
                        className="text-sm font-medium text-slate-700"
                      >
                        {t('registerPage.username')} {/* ← Use translation */}
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="userName"
                          name="userName"
                          type="text"
                          placeholder={t('registerPage.usernamePlaceholder')} // ← Use translation
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        {t('registerPage.password')} {/* ← Use translation */}
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <PasswordInput
                          id="password"
                          name="password"
                          placeholder={t('registerPage.passwordPlaceholder')} // ← Use translation
                          className="bg-white"
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>

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
                                ? t('registerPage.passwordStrengthWeak') // ← Use translation
                                : passwordStrength.score < 4
                                  ? t('registerPage.passwordStrengthGood') // ← Use translation
                                  : t(
                                      'registerPage.passwordStrengthStrong'
                                    )}{' '}
                              {/* ← Use translation */}
                            </span>
                          </div>
                          {passwordStrength.feedback.length > 0 && (
                            <div className="text-xs text-gray-600">
                              <p className="font-medium mb-1">
                                {t('registerPage.passwordMustInclude')}{' '}
                                {/* ← Use translation */}
                              </p>
                              <ul className="space-y-0.5">
                                {passwordStrength.feedback.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center space-x-1"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-700"
                      >
                        {t('registerPage.confirmPassword')}{' '}
                        {/* ← Use translation */}
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <PasswordInput
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder={t(
                            'registerPage.confirmPasswordPlaceholder'
                          )} // ← Use translation
                          className="bg-white"
                          required
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      {/* Password Match Indicator */}
                      {confirmPassword && (
                        <div className="mt-2 flex items-center space-x-2 text-xs">
                          {password === confirmPassword ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">
                                {t('registerPage.passwordsMatch')}{' '}
                                {/* ← Use translation */}
                              </span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <span className="text-red-600">
                                {t('registerPage.passwordsDontMatch')}{' '}
                                {/* ← Use translation */}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="role"
                        className="text-sm font-medium text-slate-700"
                      >
                        {t('registerPage.role')} {/* ← Use translation */}
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-slate-400" />
                        </div>
                        <Tabs
                          defaultValue="student"
                          onValueChange={handleTabChange}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="student">
                              {t('registerPage.student')}{' '}
                              {/* ← Use translation */}
                            </TabsTrigger>
                            <TabsTrigger value="teacher">
                              {t('registerPage.teacher')}{' '}
                              {/* ← Use translation */}
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={
                        isSubmitting ||
                        !password ||
                        !confirmPassword ||
                        password !== confirmPassword ||
                        passwordStrength.score < 3
                      }
                    >
                      {isSubmitting
                        ? t('registerPage.creatingAccount') // ← Use translation
                        : t('registerPage.createAccount')}{' '}
                      {/* ← Use translation */}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-slate-600">
                {t('registerPage.alreadyHaveAccount')} {/* ← Use translation */}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  {t('registerPage.signIn')} {/* ← Use translation */}
                </a>
              </p>
            </CardFooter>
          </Card>

          <div className="text-center text-xs text-slate-500">
            {t('registerPage.termsText')} {/* ← Use translation */}
            <a href="/terms" className="text-indigo-600 hover:underline">
              {t('registerPage.termsOfService')} {/* ← Use translation */}
            </a>{' '}
            {t('registerPage.and')} {/* ← Use translation */}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              {t('registerPage.privacyPolicy')} {/* ← Use translation */}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
