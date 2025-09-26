import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../components/ui/card'
import { ScrollArea } from '../components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  Calendar,
  GraduationCap,
  Edit,
  User as UserIcon,
  Play,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Languages,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnrollListHooks } from '../hooks/useEntrollListHooks'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '../components/ui/badge'
import BecomeInstructorModal from './become-instructor-modal'
import { useEnrollPlanHooks } from '../hooks/useMentorPlanEnrollHooks'
import { MentorList } from './mentor-list'
import type { User } from '../models/user'
import type { Transaction } from '../models/transaction'
import { createHttp } from '@/services/httpFactory'

const StudentProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { enrollListData, fetchEnrollList } = useEnrollListHooks()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [hoveredCard, setHoveredCard] = useState<string>('')
  const [user, setUser] = useState<User>({} as User)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const navigate = useNavigate()

  const { enrollPlan } = useEnrollPlanHooks()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileApi = createHttp('http://139.59.97.252:8080')
        const res = await profileApi.get('/users/my-info')
        const data = res.data
        if (data.code === 1000) {
          setUser({
            id: data.result.userId,
            name: data.result.lastName + ' ' + data.result.firstName,
            email: data.result.email,
            image: data.result.image,
            expertise: data.result.expertise,
            role: data.result.roleName,
          })
        } else {
          console.error('Cannot fetch user data')
        }
      } catch (error) {
        console.error('Something went wrong...')
      }
    }
    fetchUserData()
  }, [])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updateUser = {
      userId: user?.id,
      name: formData.get('name'),
      email: formData.get('email'),
      image: user?.image,
    }

    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      })
      const result = await res.json()

      if (result.success) {
        setUser(result.data)
        setIsEditing(false)
      } else {
        console.error(result.message || 'Update failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [showForm, setShowForm] = useState<boolean>(false)
  const [newSkills, setNewSkills] = useState<string>('')

  const handleAddExpertise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Split by comma or newline, trim each skill, remove empties, and remove duplicates
    const skillsToAdd = newSkills
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)

    if (skillsToAdd.length === 0) return

    // Combine old skills + new skills, dedupe
    const currentExpertise = user?.expertise || []
    const combinedSkills = Array.from(
      new Set([...currentExpertise, ...skillsToAdd])
    )

    // Update user data
    setUser(prev => {
      if (!prev) return prev
      return {
        ...prev,
        expertise: combinedSkills,
      }
    })

    setNewSkills('')
    setShowForm(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-8">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-semibold capitalize flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {user?.role} Profile
                </CardTitle>
                <p className="text-blue-100 text-sm mt-1">
                  Manage your account information
                </p>
              </div>

              {user?.role !== 'admin' && user?.id && (
                <BecomeInstructorModal
                  userId={user.id}
                  userData={{
                    id: user?.id || '',
                    name: user?.name || '',
                    email: user?.email || '',
                    role: user?.role || 'student',
                    token: user?.token || '',
                    image: user?.image,
                    phone: user?.phone,
                    gender: user?.gender,
                    profession: user?.profession,
                    about: user?.about,
                    country: user?.country,
                    expertise: user?.expertise,
                    languages: user?.languages,
                    certificates: user?.certificates,
                  }}
                  trigger={
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  }
                />
              )}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <img
                    src={
                      user?.image ||
                      '/placeholder.svg?height=400&width=400&query=professional headshot'
                    }
                    alt={user?.name || 'User Image'}
                    className="rounded-2xl w-40 h-40 object-cover shadow-lg border-4 border-white"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="mt-4 px-3 py-1 bg-blue-100 text-blue-700 capitalize"
                >
                  {user?.role || 'Student'}
                </Badge>
              </div>

              {/* User Information Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {user?.name || 'User Name'}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {user?.profession || ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Contact
                    </h3>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{user?.email || ''}</span>
                    </div>

                    {user?.phone && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    )}

                    {user?.country && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{user.country}</span>
                      </div>
                    )}
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Professional
                    </h3>

                    {user?.profession && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{user.profession}</span>
                      </div>
                    )}

                    {user?.expertise && user.expertise.length > 0 && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">
                          {user.expertise.join(', ')}
                        </span>
                      </div>
                    )}

                    {user?.languages && user.languages.length > 0 && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Languages className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm">
                          {user.languages.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* About Section */}
                {user?.about && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {user.about}
                    </p>
                  </div>
                )}

                {/* Certificates */}
                {user?.certificates && user.certificates.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Certificates
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.certificates.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1 bg-gray-50 text-gray-700"
                        >
                          {cert.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-5">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold capitalize">
              {user?.role || 'Student'} Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your courses, mentors, and transactions
            </p>
          </div>
          {user?.role === 'student' && user?.id && (
            <BecomeInstructorModal
              userId={user.id}
              userData={{
                id: user.id,
                name: user?.name || '',
                email: user?.email || '',
                image: user?.image,
                phone: user?.phone,
                gender: user?.gender,
              }}
              trigger={
                <Button
                  onClick={openModal}
                  className="mt-4 md:mt-0 px-6 py-3 text-white font-semibold text-base
                  bg-[#5943E3] hover:bg-[#4735b5]
                  shadow-lg hover:shadow-xl transition-all duration-800
                  rounded-full animate-pulse"
                >
                  <UserIcon className="mr-2 h-5 w-5" /> Join as Instructor
                </Button>
              }
            />
          )}
        </div>

        <div>
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="flex overflow-x-scroll lg:w-fit lg:overflow-hidden lg:justify-start">
              <TabsTrigger className="ml-24 lg:ml-0" value="courses">
                Enrolled Courses
              </TabsTrigger>
              <TabsTrigger value="mentors">Booked Mentors</TabsTrigger>
            </TabsList>
            <TabsContent value="courses">
              <div className="container mx-auto py-6">
                <h2 className="text-2xl font-bold mb-6">My Enrolled Courses</h2>
                <ScrollArea className="h-[800px] rounded-lg border bg-card p-1">
                  <div className="grid gap-4 p-4">
                    {enrollListData.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        <p className="text-lg">No courses enrolled yet.</p>
                        <p className="text-sm">
                          Explore our courses and start learning today!
                        </p>
                        <Link
                          to="/courselist"
                          className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                          Browse Courses
                        </Link>
                      </div>
                    ) : (
                      enrollListData.map((course, index: number) => (
                        <Card
                          key={index}
                          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                          onMouseEnter={() => setHoveredCard(course._id || '')}
                          onMouseLeave={() => setHoveredCard('')}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                              <img
                                src={course.thumbnail || '/placeholder.svg'}
                                alt={course.title}
                                className="object-cover w-full h-full"
                              />
                              {hoveredCard === course._id && (
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                                  >
                                    <Play
                                      className="h-8 w-8 text-white"
                                      fill="white"
                                    />
                                  </Button>
                                </div>
                              )}
                              {course.completed && (
                                <Badge className="absolute top-3 right-3 z-20 bg-green-500 hover:bg-green-600">
                                  Completed
                                </Badge>
                              )}
                            </div>

                            <div className="flex-1 p-6">
                              <CardHeader className="p-0 pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold">
                                      {course.title}
                                    </h3>
                                    <div className="flex items-center mt-2 text-muted-foreground">
                                      <Avatar className="h-6 w-6 mr-2 object-cover">
                                        <AvatarImage
                                          src={
                                            course.instructor?.image ||
                                            '/placeholder.svg'
                                          }
                                          alt={course.instructor?.name || ''}
                                        />
                                        <AvatarFallback>
                                          {course.instructor?.name?.[0] || '?'}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span>{course.instructor?.name}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>

                              <CardContent className="p-0 py-4">
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium">
                                        Progress
                                      </span>
                                      <span className="text-sm font-medium">
                                        {course.progress || 0}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={course.progress || 0}
                                      className="h-2"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      <span>
                                        Enrolled{' '}
                                        {formatDistanceToNow(
                                          new Date(
                                            course.createdAt || new Date()
                                          ),
                                          { addSuffix: true }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>

                              <CardFooter className="p-0 pt-4 flex justify-between items-center">
                                <Link
                                  to={`/profile/enroll-lectures?id=${course._id}`}
                                >
                                  <Button variant="outline" className="gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    Continue Learning
                                  </Button>
                                </Link>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="mentors">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {enrollPlan.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg">No mentorship enrolled yet.</p>
                    <p className="text-sm">
                      Explore our mentors and start learning today!
                    </p>
                    <Link
                      to="/mentorlist"
                      className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                      Browse Mentors
                    </Link>
                  </div>
                ) : (
                  <MentorList enrollments={enrollPlan} />
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
