'use client'
import React, { useCallback, useState, useEffect, Suspense } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  MapPin,
  Search,
  Star,
  GraduationCap,
  ArrowRight,
  Filter,
} from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import GlobalPagination from '@/components/GlobalPagination'
import axios from 'axios'
interface MentorData {
  _id: string
  name: string
  image?: string
  rating?: number
  reviews?: number
  hourlyRate?: number
  country?: string
  desc?: string
  bio?: string
  studentCount?: number
}

interface TutorCardProps {
  href: string
  name: string
  image?: string
  studentCount?: string
  rating?: number
  reviews?: number
  price?: number
  location?: string
}

export default function AllMentor(): React.ReactElement {
  return (
    <Suspense fallback={<Skeleton className="h-80 w-[300px] rounded-xl" />}>
      <AllMentorComponent />
    </Suspense>
  )
}

function AllMentorComponent(): React.ReactElement {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [userData, setUserData] = useState<MentorData[] | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalData, setTotalData] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('newest')

  const [selectedGender, setSelectedGender] = useState<string>('all')
  const [isVerified, setIsVerified] = useState<string>('all')
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]) // default checked
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const sortMap: Record<string, string> = {
    newest: 'newest',
    'rating-high': 'highestRated',
    'price-low': 'priceLowToHigh',
    'price-high': 'priceHighToLow',
  }

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      // const queryParams = new URLSearchParams()
      // if (searchTerm.trim()) {
      //   queryParams.append('search', searchTerm.trim())
      // }
      // // Gender
      // if (selectedGender !== 'all') {
      //   queryParams.append('gender', selectedGender)
      // }

      // // Verification
      // if (isVerified !== 'all') {
      //   queryParams.append('isVerified', isVerified) // "true"
      // }

      // // Rating (minimum selected rating)
      // if (selectedRatings.length) {
      //   const minRating = Math.min(...selectedRatings.map(Number))
      //   queryParams.append('minRating', String(minRating))
      // }
      // // Sort

      // if (sortBy && sortMap[sortBy]) {
      //   queryParams.append('sort', sortMap[sortBy])
      // }

      // queryParams.append('page', String(currentPage))
      // queryParams.append('limit', '9')
      // const url = `/api/user/instructor/list?${queryParams.toString()}`

      // const res = await fetch(url, {
      //   method: 'GET',
      // })
      const data = await axios.get(`http://139.59.97.252:8080/search/tutors`)
      const rawData = data.data.result

      const mapped: MentorData[] = rawData.map((item: any) => ({
        _id: item.id,
        name: item.tutorName,
        image: item.avatar,
        rating: item.rating,
        reviews: item.reviewCount,
        hourlyRate: item.hourlyRate,
        country: '',
        desc: item.desc,
        bio: item.bio,
        studentCount: item.studentCount,
      }))
      // const data = await res.json()
      setUserData(mapped)
      setTotalData(0)
      setTotalPages(1)
      //setTotalPages(Math.ceil(data.pagination.total / 9)) // Assuming total items count is returned in the response
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [
    currentPage,
    searchTerm,
    selectedGender,
    isVerified,
    selectedRatings,
    sortBy,
  ])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleRatingChange = (value: string, checked: boolean): void => {
    if (checked) {
      setSelectedRatings(prev => [...prev, value])
    } else {
      setSelectedRatings(prev => prev.filter(r => r !== value))
    }
  }

  const [toggleFilter, setToggleFilter] = useState<boolean>(true)
  const handleToggleFilter = (): void => {
    setToggleFilter(!toggleFilter)
  }

  const [toggleClose, setToggleClose] = useState<boolean>(false)
  const handleClose = (): void => {
    setToggleClose(!toggleClose)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-navy-900">
            Explore Mentorship
          </h1>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <span>Mentorship</span>
            <span className="mx-2">→</span>
            <span>Explore the Mentorship & grow up your skill</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-4 lg:py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-3 lg:gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-full md:w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                <Button
                  onClick={() => {
                    setSelectedGender('all')
                    setIsVerified('all')
                    setSelectedRatings([])
                    setSearchTerm('')
                  }}
                  variant="ghost"
                  className="text-sm text-blue-600 h-auto p-0"
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search tutors..."
                    className="pl-9"
                  />
                </div>

                {/* Tutor Type */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Tutor Type
                  </h3>
                  <RadioGroup value={isVerified} onValueChange={setIsVerified}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="tutor-all" />
                      <Label htmlFor="tutor-all" className="text-sm">
                        All Tutor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="verified" />
                      <Label htmlFor="verified" className="text-sm">
                        Verified
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Gender */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Gender
                  </h3>
                  <RadioGroup
                    value={selectedGender}
                    onValueChange={setSelectedGender}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="gender-all" />
                      <Label htmlFor="gender-all" className="text-sm">
                        All
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-sm">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-sm">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Star Category */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2].map(star => (
                      <div key={star} className="flex items-center space-x-2">
                        <Checkbox
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                          id={`${star}-star`}
                          checked={selectedRatings.includes(String(star))}
                          onCheckedChange={checked =>
                            handleRatingChange(String(star), checked === true)
                          }
                        />
                        <Label
                          htmlFor={`${star}-star`}
                          className="text-sm flex items-center"
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{star} Star</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </div>
          </div>

          <div className="">
            {!toggleFilter && (
              <div className="bg-black w-full h-[1000px] bg-opacity-70 fixed top-0 left-0 z-[9999]">
                <button
                  id="toggleClose"
                  onClick={handleToggleFilter}
                  className="fixed top-2 right-4 z-[100] rounded-full bg-white p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 fill-red-600"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path
                      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
                <div className="h-full w-72 bg-white overflow-scroll rounded-br-sm">
                  <div className=" w-72 border p-6 sticky top-0">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Filters
                      </h2>
                      <Button
                        onClick={() => {
                          setSelectedGender('all')
                          setIsVerified('all')
                          setSelectedRatings([])
                          setSearchTerm('')
                        }}
                        variant="ghost"
                        className="text-sm text-blue-600 h-auto p-2"
                      >
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          value={searchTerm}
                          onChange={handleInputChange}
                          placeholder="Search tutors..."
                          className="pl-9"
                        />
                      </div>

                      {/* Tutor Type */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          Tutor Type
                        </h3>
                        <RadioGroup
                          value={isVerified}
                          onValueChange={setIsVerified}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="tutor-all" />
                            <Label htmlFor="tutor-all" className="text-sm">
                              All Tutor
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="verified" />
                            <Label htmlFor="verified" className="text-sm">
                              Verified
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      {/* Gender */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          Gender
                        </h3>
                        <RadioGroup
                          value={selectedGender}
                          onValueChange={setSelectedGender}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="gender-all" />
                            <Label htmlFor="gender-all" className="text-sm">
                              All
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="text-sm">
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="text-sm">
                              Female
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      {/* Star Category */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          Rating
                        </h3>
                        <div className="space-y-2">
                          {[5, 4, 3, 2].map(star => (
                            <div
                              key={star}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                id={`${star}-star`}
                                checked={selectedRatings.includes(String(star))}
                                onCheckedChange={checked =>
                                  handleRatingChange(
                                    String(star),
                                    checked === true
                                  )
                                }
                              />
                              <Label
                                htmlFor={`${star}-star`}
                                className="text-sm flex items-center"
                              >
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{star} Star</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full mt-4">Apply Filters</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Showing{' '}
                <span className="text-blue-600">{userData?.length}</span> of{' '}
                <span className="text-blue-600">{totalData}</span> Results
              </h1>
              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <div className=" lg:hidden w-full">
                  <Button
                    onClick={handleToggleFilter}
                    variant="outline"
                    className="flex items-center font-thin gap-1 px-2 py-0 h-[30px]"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
                {/* mobile sidebar filter */}
                <Select
                  defaultValue="newest"
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[100px] lg:w-[140px] h-[30px] lg:h-[40px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating-high">Highest Rated</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tutor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Tutor Card 1 */}
              {userData === null ? (
                // Show loading skeletons
                Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-80 w-[300px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))
              ) : userData.length === 0 ? (
                // Show "No data found" message
                <div className="text-center text-gray-500 col-span-full py-10 text-lg">
                  No instructor found.
                </div>
              ) : (
                userData.map((mentor, index) => (
                  <TutorCard
                    key={index}
                    href={`/mentor?id=${mentor._id}`}
                    name={mentor.name}
                    image={mentor.image || '/placeholder.svg'}
                    studentCount={
                      mentor.studentCount ? String(mentor.studentCount) : '0'
                    }
                    rating={mentor.rating}
                    reviews={mentor.reviews}
                    price={mentor.hourlyRate}
                    location={mentor.country}
                  />
                ))
              )}
            </div>

            {userData && (
              <GlobalPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalPages * 10} // or real total count from backend
                currentPageDataLength={userData.length}
                onPageChange={page => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TutorCard({
  href,
  name,
  image,
  studentCount,
  rating,
  reviews,
  price,
  location,
}: TutorCardProps): React.ReactElement {
  const navigate = useNavigate()

  const handleCardClick = (): void => {
    navigate(href)
  }

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] relative bg-gray-100">
          <img
            src={image || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="pl-5 pt-5 pr-5 pb-0">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <GraduationCap className="h-4 w-4" />
            <span>{studentCount} Students</span>
          </div>
          <div className="flex items-center gap-1 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-blue-600">${price}</span>
              <span className="text-gray-500 text-sm">/hr</span>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location || 'Vietnam'}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pl-5 pb-5 pr-5 pt-0">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
