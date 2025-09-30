import { useNavigate } from 'react-router-dom' // thay cho next/navigation
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { AtSign, KeyRound, ArrowRight } from 'lucide-react'
import logo from '../assets/icon/logo.png'
import { useAuth } from '@/providers/AuthProvider'
import { PasswordInput } from '@/components/ui/password-input'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const username = (form.elements.namedItem('email') as HTMLInputElement)
      .value
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value

    const toastID = toast.loading('Logging in...')

    try {
      const result = await login(username, password)

      if (result.code === 1000) {
        toast.success('Login successful!')
        navigate('/')
      } else {
        toast.error(result.result.message || 'Login failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      toast.dismiss(toastID)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-800 opacity-90" />
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

        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-12 text-white">
          <div className="mb-8 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 transform rotate-3">
              <a href="/">
                <img
                  src={logo}
                  alt="Smart Academy Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          <div className="relative mb-8 w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl transform rotate-3" />
            <div className="relative p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <img
                src="https://img.freepik.com/free-vector/teacher-student-concept-illustration_114360-7925.jpg"
                alt="Learning illustration"
                width={600}
                height={600}
                className="object-contain w-full rounded-xl"
              />
            </div>
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-white/80">
              Continue your learning journey with access to thousands of courses
              and expert instructors.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <a href="/">
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
              Welcome Back
            </h1>
            <p className="mt-2 text-slate-600">
              Sign in to your Smart Academy account
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AtSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="pl-10 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </Label>
                    <a
                      href="/forgot-password"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="pl-10 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium text-slate-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Sign in
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
