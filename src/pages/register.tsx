import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // thay cho next/navigation
import toast from 'react-hot-toast'
import {
  XCircle,
  Upload,
  AtSign,
  KeyRound,
  Phone,
  Briefcase,
  User,
  ChevronRight,
  DollarSign,
  Map,
  Globe,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import logo from '../assets/icon/logo.png'
export default function ModernRegister() {
  const [activeTab, setActiveTab] = useState('student')
  const [chips, setChips] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    image: '',
  })

  const handleTabChange = (value: any) => {
    setActiveTab(value)
  }

  const handleKeyDown = (e: any) => {
    // if (e.key === "Enter" && inputValue.trim() !== "") {
    //   e.preventDefault();
    //   if (!chips.includes(inputValue.trim())) {
    //     setChips([...chips, inputValue.trim()]);
    //   }
    //   setInputValue("");
    // }
  }

  const handleDelete = (chipToDelete: any) => {
    // setChips(chips.filter((chip) => chip !== chipToDelete));
  }

  const uploadImage = async (file: any) => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append(
    //   "upload_preset",
    //   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET || ""
    // );
    // formData.append(
    //   "api_key",
    //   process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ""
    // );
    // try {
    //   setUploading(true);
    //   const xhr = new XMLHttpRequest();
    //   xhr.open(
    //     "POST",
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}/image/upload`
    //   );
    //   xhr.upload.onprogress = (event) => {
    //     if (event.lengthComputable) {
    //       const percentComplete = (event.loaded / event.total) * 100;
    //       setUploadProgress(percentComplete);
    //     }
    //   };
    //   xhr.onload = () => {
    //     if (xhr.status === 200) {
    //       const data = JSON.parse(xhr.responseText);
    //       setUser({ ...user, image: data.secure_url });
    //       setUploading(false);
    //       setUploadProgress(0);
    //     } else {
    //       console.error("Image upload failed: ", xhr.responseText);
    //       toast.error("Image upload failed");
    //       setUploading(false);
    //     }
    //   };
    //   xhr.onerror = () => {
    //     console.error("Image upload failed.");
    //     toast.error("Image upload failed");
    //     setUploading(false);
    //   };
    //   xhr.send(formData);
    // } catch (error) {
    //   console.error("Image upload failed: ", error);
    //   toast.error("Image upload failed");
    //   setUploading(false);
    // }
  }

  const handleImageChange = (e: any) => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   // Create a preview
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setPreviewImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    //   uploadImage(file);
    // }
  }

  const registerUser = async (e: any) => {
    // e.preventDefault();
    // setIsSubmitting(true);
    // const formData = new FormData(e.currentTarget);
    // formData.append("image", user.image);
    // formData.append(
    //   "role",
    //   activeTab === "instructor" ? "instructor" : "student"
    // );
    // chips.forEach((chip) => {
    //   formData.append("expartise", chip);
    // });
    // try {
    //   const toastID = toast.loading("Creating your account...");
    //   const res = await fetch("/api/register/", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await res.json();
    //   toast.dismiss(toastID);
    //   if (res.status < 200 || res.status >= 300) {
    //     toast.error(data.message || "Registration failed");
    //   } else {
    //     // ✅ Insert user into Firebase Firestore after successful registration
    //     await insertUser({
    //       id: data.userid,
    //       name: formData.get("name"),
    //       email: formData.get("email"),
    //       image: user.image,
    //       role: activeTab === "instructor" ? "instructor" : "student",
    //       deviceToken: "", // push token if needed
    //     });
    //     toast.success("Account created successfully!");
    //     router.push("/login");
    //   }
    // } catch (error) {
    //   console.error("Failed to create user: ", error);
    //   toast.error("Registration failed. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
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
            <CardHeader className="pb-4">
              <Tabs
                defaultValue="student"
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <form onSubmit={registerUser} className="space-y-5">
                <div className="space-y-4">
                  {/* Basic Information - Both Student and Instructor */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-slate-700"
                      >
                        Full Name
                      </Label>
                      <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="name"
                          name="name"
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
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <KeyRound className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instructor-specific fields */}
                  {activeTab === 'instructor' && (
                    <div className="space-y-5 pt-2 border-t border-slate-100">
                      <div className="relative">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-slate-700"
                        >
                          Phone Number
                        </Label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="+1 (555) 123-4567"
                            className="pl-10 bg-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <Label
                          htmlFor="profession"
                          className="text-sm font-medium text-slate-700"
                        >
                          Profession
                        </Label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="profession"
                            name="profession"
                            type="text"
                            placeholder="Software Engineer, Math Teacher, etc."
                            className="pl-10 bg-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="about"
                          className="text-sm font-medium text-slate-700"
                        >
                          About Yourself
                        </Label>
                        <Textarea
                          id="about"
                          name="about"
                          placeholder="Share your experience, qualifications, and teaching style..."
                          className="min-h-[100px] bg-white"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="image"
                          className="text-sm font-medium text-slate-700"
                        >
                          Profile Image
                        </Label>
                        <div className="flex items-center space-x-4">
                          <div className="relative flex-shrink-0">
                            {previewImage ? (
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-200">
                                <img
                                  src={previewImage || '/placeholder.svg'}
                                  alt="Profile preview"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
                                <User className="h-8 w-8 text-slate-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-grow">
                            <label htmlFor="image" className="cursor-pointer">
                              <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                                <Upload className="h-4 w-4 text-indigo-500" />
                                <span className="text-sm text-slate-700">
                                  Upload photo
                                </span>
                              </div>
                              <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                required
                              />
                            </label>
                            {uploading && (
                              <div className="mt-2">
                                <Progress
                                  value={uploadProgress}
                                  className="h-1.5"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                  Uploading: {Math.round(uploadProgress)}%
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="skill"
                          className="text-sm font-medium text-slate-700"
                        >
                          Areas of Expertise
                        </Label>
                        <div className="p-3 bg-white border border-slate-200 rounded-md min-h-[80px]">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {chips.map((chip, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                              >
                                {chip}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(chip)}
                                  className="ml-1 rounded-full hover:bg-indigo-200 p-0.5"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="relative">
                            <Input
                              id="expartise"
                              value={inputValue}
                              onChange={e => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Type a skill and press Enter (e.g., Mathematics, Programming)"
                              className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            Add your areas of expertise to help students find
                            you
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <Label
                          htmlFor="hourly-rate"
                          className="text-sm font-medium text-slate-700"
                        >
                          Hourly Rate ($)
                        </Label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="hourly-rate"
                            name="hourly-rate"
                            type="number"
                            placeholder="0"
                            className="pl-10 bg-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Label
                          htmlFor="country"
                          className="text-sm font-medium text-slate-700"
                        >
                          Country
                        </Label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-slate-400" />
                          </div>
                          <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="USA"
                            className="pl-10 bg-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={isSubmitting || uploading}
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
