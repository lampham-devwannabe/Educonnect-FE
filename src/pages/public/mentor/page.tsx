import React, { useCallback, useEffect, useState, Suspense } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Star,
  Play,
  MessageSquare,
  MapPin,
  Clock,
  Activity,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Shield,
  Award,
  Languages,
  Briefcase,
  Package,
  Send,
  Calendar,
  CircleSlash,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import MentorReviews from './review'
import { usePaymentMethod } from '@/hooks/usePaymentMethod'
import PaymentModal from './payment-modal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Type definitions
interface MentorDetails {
  _id?: string
  name?: string
  image?: string
  role?: string
  profession?: string
  hourlyRate?: number
  averageRating?: number
  totalReviews?: number
  country?: string
  responseTime?: string
  expartise?: string[]
  language?: string[]
  certificate?: string[]
  about?: string
  isVerified?: boolean
  introVideoUrl?: string
}

export interface PlanPackage {
  _id?: string
  price?: number
  services?: string[]
  title?: string
  description?: string
}

interface MentorPlan {
  id?: string
  starterPlan?: PlanPackage
  advancedPlan?: PlanPackage
  premiumPlan?: PlanPackage
}

interface Course {
  _id: string
  title?: string
  description?: string
}

interface Mentor {
  _id: string
  name?: string
  image?: string
  profession?: string
  hourlyRate?: number
  country?: string
  rating?: number
  reviewCount?: number
}

interface MentorData {
  data: Mentor[]
  total: number
}

function MentorComponent(): React.ReactElement {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mentorID = searchParams.get('id')

  const [mentorDetails, setMentorDetails] = useState<MentorDetails>({})
  const [mentorPlan, setMentorPlan] = useState<MentorPlan>({})
  const [mentorCourse, setMentorCourse] = useState<Course[]>([])
  const [mentorData, setMentorData] = useState<Mentor[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const { paymentMethods } = usePaymentMethod()
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false)

  const handleSendMessage = (): void => {
    if (message.trim()) {
      setIsMessageSent(true)
      setMessage('')
      // Here you would typically send the message to your backend
      setTimeout(() => {
        setIsMessageSent(false)
        setIsMessageModalOpen(false)
      }, 2000)
    }
  }

  const fetchMentors = useCallback(async (): Promise<void> => {
    try {
      const formdata = new FormData()
      formdata.set('page', String(currentPage + 1))
      formdata.set('pagination', '4')
      formdata.set('role', 'instructor')
      const res = await fetch('/api/user', {
        method: 'POST',
        body: formdata,
      })

      const data: MentorData = await res.json()
      setMentorData(data.data)
      setTotalPages(Math.ceil(data.total / 5))
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [currentPage])

  useEffect(() => {
    fetchMentors()
  }, [fetchMentors])

  useEffect(() => {
    const getMentorDetails = async (): Promise<void> => {
      if (!mentorID) return

      const formdata = new FormData()
      formdata.append('userid', mentorID)
      try {
        const response = await fetch('/api/user/details', {
          method: 'POST',
          body: formdata,
        })
        const data = await response.json()
        setMentorDetails(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getMentorPlan = async (): Promise<void> => {
      if (!mentorID) return

      const fromdata = new FormData()
      fromdata.append('user_id', mentorID)
      try {
        const response = await fetch('/api/mentorship-plan/all', {
          method: 'POST',
          body: fromdata,
        })
        const data: MentorPlan = await response.json()
        setMentorPlan(data)
      } catch (error) {
        console.log(error)
      }
    }

    const getMentorCourse = async (): Promise<void> => {
      if (!mentorID) return

      console.log(mentorID)
      const fromdata = new FormData()
      fromdata.append('instructor', mentorID)
      try {
        const response = await fetch('/api/course', {
          method: 'POST',
          body: fromdata,
        })
        const data = await response.json()
        setMentorCourse(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (mentorID) {
      getMentorDetails()
      getMentorPlan()
      getMentorCourse()
    }
  }, [mentorID])

  const [selectedTab, setSelectedTab] = useState<string>('starterPlan')

  const handleTabChange = (value: string): void => {
    setSelectedTab(value)
  }

  const getPlanData = (): PlanPackage | null => {
    switch (selectedTab) {
      case 'starterPlan':
        return mentorPlan?.starterPlan || null
      case 'advancedPlan':
        return mentorPlan?.advancedPlan || null
      case 'premiumPlan':
        return mentorPlan?.premiumPlan || null
      default:
        return null
    }
  }

  const selectedPlan = getPlanData()
  const planId = mentorPlan?.id
  const selectPackage = selectedPlan

  const handleMentorClick = (mentorId: string): void => {
    navigate(`/mentor?id=${mentorId}`)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-24 sm:mb-32">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 h-64 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-6 right-6">
              {mentorDetails?.isVerified && (
                <Badge className="bg-white/20 text-white border-white/30">
                  <Shield className="h-4 w-4 mr-1" />
                  Verified Mentor
                </Badge>
              )}
            </div>
          </div>
          <div className="absolute -bottom-16 sm:-bottom-24 left-8 flex items-end">
            <div className="relative">
              <img
                src={mentorDetails?.image || '/placeholder.svg'}
                alt={mentorDetails?.name || 'Mentor'}
                width="176"
                height="176"
                className="w-44 h-44 rounded-full border-4 border-white shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {mentorDetails?.name}
                      </h1>
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 bg-blue-50"
                      >
                        {mentorDetails?.role?.charAt(0).toUpperCase() +
                          (mentorDetails?.role?.slice(1) || '')}
                      </Badge>
                    </div>
                    <p className="text-xl text-gray-600 mb-3">
                      {mentorDetails?.profession}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue-600">
                        ${mentorDetails?.hourlyRate}
                      </span>
                      <span className="text-lg text-gray-500">/hour</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200 bg-green-50 px-4 py-2"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Quick Responder
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">
                      {mentorDetails?.averageRating} (
                      {mentorDetails?.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{mentorDetails?.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <span className="text-green-600">Online Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">
                      {mentorDetails?.responseTime}
                    </span>
                  </div>
                </div>

                {/* Enhanced Skills Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Technical Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mentorDetails?.expartise?.map(
                      (skill: string, index: number) => (
                        <Badge
                          key={index}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {/* Languages Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Languages className="h-5 w-5 text-purple-600" />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mentorDetails?.language?.map(
                      (lang: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {lang}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {mentorDetails?.certificate?.map(
                      (cert: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                        >
                          <Award className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium">{cert}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {/* Video Introduction Modal */}
                  <Dialog
                    open={isVideoModalOpen}
                    onOpenChange={setIsVideoModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl"
                      >
                        <Play className="mr-2 h-5 w-5" /> Watch Introduction
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          Meet {mentorDetails?.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                        <iframe
                          src={mentorDetails?.introVideoUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex justify-center pt-4">
                        <Button
                          onClick={() => setIsVideoModalOpen(false)}
                          variant="outline"
                          className="px-6"
                        >
                          Close
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Message Modal */}
                  <Dialog
                    open={isMessageModalOpen}
                    onOpenChange={setIsMessageModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="px-6">
                        <MessageSquare className="mr-2 h-5 w-5" /> Send Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                          Book a Session with {mentorDetails?.name}
                        </DialogTitle>
                      </DialogHeader>
                      {!isMessageSent ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-sm text-gray-700 font-medium">
                              💡 Ready to book a mentoring session?
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Send a message to {mentorDetails?.name} to get
                              started!
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Hi! I'd like to book a mentoring session with you. I'm interested in..."
                              value={message}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => setMessage(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={handleSendMessage}
                              className="flex-1 bg-primary hover:bg-primary/90"
                              disabled={!message.trim()}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsMessageModalOpen(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-green-600 mb-2">
                            Message Sent Successfully!
                          </h3>
                          <p className="text-muted-foreground">
                            {mentorDetails?.name} will get back to you soon to
                            schedule your session.
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mentorDetails?.about}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <MentorReviews mentorId={mentorID || ''} />
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-[--primary] to-[--primary-hover] text-white p-6">
              <h2 className="text-2xl font-bold mb-4">Mentorship Packages</h2>
              <p className="mb-4">
                Choose the perfect package for your learning journey
              </p>
            </div>

            <CardContent className="pt-6">
              {mentorPlan?.starterPlan ||
              mentorPlan?.advancedPlan ||
              mentorPlan?.premiumPlan ? (
                <Tabs
                  defaultValue="starterPlan"
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="starterPlan">Starter</TabsTrigger>
                    <TabsTrigger value="advancedPlan">Advanced</TabsTrigger>
                    <TabsTrigger value="premiumPlan">Premium</TabsTrigger>
                  </TabsList>

                  {/* Starter Plan */}
                  <TabsContent value="starterPlan">
                    {mentorPlan?.starterPlan ? (
                      <div className="space-y-2">
                        <p className="text-3xl font-bold">
                          ${mentorPlan?.starterPlan?.price}
                          <span className="text-xl font-normal">/month</span>
                        </p>
                        <ul className="space-y-1">
                          {mentorPlan?.starterPlan?.services?.map(
                            (feature: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground py-8">
                        <CircleSlash className="h-10 w-10 mb-2" />
                        <p>No Starter plan available.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Advanced Plan */}
                  <TabsContent value="advancedPlan">
                    {mentorPlan?.advancedPlan ? (
                      <div className="space-y-2">
                        <p className="text-3xl font-bold">
                          ${mentorPlan?.advancedPlan?.price}
                          <span className="text-xl font-normal">/month</span>
                        </p>
                        <ul className="space-y-1">
                          {mentorPlan?.advancedPlan?.services?.map(
                            (feature: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground py-8">
                        <CircleSlash className="h-10 w-10 mb-2" />
                        <p>No Advanced plan available.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Premium Plan */}
                  <TabsContent value="premiumPlan">
                    {mentorPlan?.premiumPlan ? (
                      <div className="space-y-2">
                        <p className="text-3xl font-bold">
                          ${mentorPlan?.premiumPlan?.price}
                          <span className="text-xl font-normal">/month</span>
                        </p>
                        <ul className="space-y-1">
                          {mentorPlan?.premiumPlan?.services?.map(
                            (feature: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-muted-foreground py-8">
                        <CircleSlash className="h-10 w-10 mb-2" />
                        <p>No Premium plan available.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">
                    No mentorship packages are available right now.
                  </p>
                  <p className="text-sm">Please check back later!</p>
                </div>
              )}
            </CardContent>

            <CardFooter>
              {mentorPlan.starterPlan && planId && selectPackage ? (
                <PaymentModal
                  paymentMethods={paymentMethods}
                  planId={planId}
                  selectPackage={selectPackage}
                />
              ) : null}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mentorData?.map((mentor: Mentor) => (
              <div key={mentor._id}>
                <div
                  onClick={() => handleMentorClick(mentor._id)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-[4/3] relative bg-gray-100">
                      <img
                        src={mentor.image || '/placeholder.jpg'}
                        alt={mentor.name || 'Mentor'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <GraduationCap className="h-4 w-4" />
                        <span>{mentor.profession || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-[--primary]">
                            ${mentor.hourlyRate || '120'}
                          </span>
                          <span className="text-gray-500 text-sm">/hr</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          {mentor.country || 'Dhaka'}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MentorDetails(): React.ReactElement {
  return (
    <Suspense fallback={<Skeleton className="h-80 w-[300px] rounded-xl" />}>
      <MentorComponent />
    </Suspense>
  )
}
