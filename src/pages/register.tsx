import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // thay cho next/navigation
import toast from 'react-hot-toast'
import {
  AtSign,
  Phone,
  Briefcase,
  User,
  ChevronRight,
  Info,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import logo from '../assets/icon/logo.png'
import { DobInput } from '@/components/ui/dob-input'
import { PasswordInput } from '@/components/ui/password-input'

import { useAuth, type RegisterFormData } from '@/providers/AuthProvider'

export default function Register() {
  const [activeTab, setActiveTab] = useState('student')
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)

  const registerUser = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Prepare the data object for API call
      const userData: RegisterFormData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        username: formData.get('userName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        phoneNumber: formData.get('phone') as string,
        address: formData.get('address') as string,
        dob: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : null, // Format as YYYY-MM-DD
        roleName: 'user',
        loginType: '',
      }

      // Validate required fields
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password
      ) {
        toast.error('Please fill in all required fields')
        return
      }

      if (!userData.dob) {
        toast.error('Please select your date of birth')
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        toast.error('Please enter a valid email address')
        return
      }

      // Validate password length
      if (userData.password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return
      }

      const toastId = toast.loading('Creating your account...')

      // Make API call
      const response = await register(userData)

      toast.dismiss(toastId)

      if (response) {
        toast.success('Account created successfully!')

        // Redirect to login page
        navigate('/login')
      } else {
        throw new Error('Registration failed')
      }
    } catch (error: any) {
      console.error('Registration error:', error)

      let errorMessage = 'Registration failed. Please try again.'

      // Handle different types of errors
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid data provided'
      } else if (error.response?.status === 409) {
        errorMessage = 'An account with this email already exists'
      } else if (error.response?.status === 422) {
        errorMessage = 'Please check your input data'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                alt="Smart Academy Logo"
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
              Unlock Your Learning Potential
            </h2>
            <p className="text-white/80">
              Join thousands of students and instructors in our global learning
              community.
            </p>

            {/* Testimonial */}
            <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="italic text-white/90">
                Smart Academy transformed my learning experience. The
                instructors are amazing!
              </p>
              <div className="mt-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">
                  Sarah Johnson, Student
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-around w-full max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-xs text-white/70">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs text-white/70">Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-xs text-white/70">Courses</div>
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
                  alt="Smart Academy Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </a>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create Your Account
            </h1>
            <p className="mt-2 text-slate-600">
              Join Smart Academy and start your learning journey
            </p>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4"></CardHeader>

            <CardContent>
              <form onSubmit={registerUser} className="space-y-5">
                <div className="space-y-4">
                  {/* Basic Information - Both Student and Instructor */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-slate-700"
                      >
                        First Name
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Info className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="John "
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-slate-700"
                      >
                        Last Name
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Info className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
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
                        UserName
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="userName"
                          name="userName"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        Email Address
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AtSign className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
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
                        Password
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <PasswordInput
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          className="bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-slate-700"
                      >
                        Phone
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(+84) 123 456 7890"
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Label
                        htmlFor="dob"
                        className="text-sm font-medium text-slate-700"
                      >
                        Date of Birth
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <DobInput
                          value={dateOfBirth}
                          onChange={setDateOfBirth}
                          placeholder="Select your date of birth"
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium text-slate-700"
                      >
                        Address
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="123 Main St, City, Country"
                          className="min-h-[100px] bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="role"
                        className="text-sm font-medium text-slate-700"
                      >
                        Role
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-slate-400" />
                        </div>
                        <Tabs defaultValue="student" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="instructor">
                              Instructor
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </div>

                  {/* Instructor-specific fields */}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Sign in
                </a>
              </p>
            </CardFooter>
          </Card>

          <div className="text-center text-xs text-slate-500">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
