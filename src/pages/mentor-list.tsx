import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MessageCircle,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  RefreshCw,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Enrollment } from '@/models/user'

interface MentorListProps {
  enrollments: Enrollment[]
}

export function MentorList({
  enrollments,
}: MentorListProps): React.ReactElement {
  const isActive = (endDate: string): boolean => {
    return new Date(endDate) > new Date()
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleChatClick = (enrollment: Enrollment): void => {
    if (isActive(enrollment.endDate)) {
      console.log('Opening chat for mentor:', enrollment)
    }
  }

  const handleRenewClick = (enrollment: Enrollment): void => {
    console.log('Renewing enrollment for:', enrollment)
  }

  return (
    <>
      <div className="space-y-4">
        {enrollments?.map(enrollment => {
          const active = isActive(enrollment.endDate)
          const daysRemaining = getDaysRemaining(enrollment.endDate)

          return (
            <Card
              key={enrollment._id}
              className={`transition-all duration-200 hover:shadow-lg ${
                active
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-6">
                  {/* Left Section - Mentor Info */}
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    <Avatar className="h-16 w-16 ring-2 ring-white shadow-sm flex-shrink-0">
                      <AvatarImage
                        src={enrollment.mentor.image || '/placeholder.svg'}
                        alt={enrollment.mentor.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                        {enrollment.mentor.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl text-gray-900 truncate">
                          {enrollment.mentor.name}
                        </h3>
                        <Badge
                          variant={active ? 'default' : 'secondary'}
                          className={`${
                            active
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          } flex-shrink-0`}
                        >
                          {active ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" /> Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" /> Expired
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {enrollment.package.title}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {enrollment.package.price}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {enrollment.package.short_description}
                      </p>
                    </div>
                  </div>

                  {/* Middle Section - Package Services */}
                  <div className="hidden lg:block min-w-0 flex-1 max-w-xs">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Services:
                    </h5>
                    <div className="space-y-1">
                      {enrollment.package.services
                        .slice(0, 3)
                        .map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                            <span className="truncate">{service}</span>
                          </div>
                        ))}
                      {enrollment.package.services.length > 3 && (
                        <div className="text-xs text-gray-500 ml-5">
                          +{enrollment.package.services.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Timeline & Action */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    {/* Timeline */}
                    <div className="hidden md:block text-right min-w-0">
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center justify-end text-sm">
                          <span className="text-gray-600 mr-2">Started:</span>
                          <span className="font-medium">
                            {formatDate(enrollment.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center justify-end text-sm">
                          <span className="text-gray-600 mr-2">
                            {active ? 'Ends:' : 'Ended:'}
                          </span>
                          <span
                            className={`font-medium ${active ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {formatDate(enrollment.endDate)}
                          </span>
                        </div>
                      </div>

                      {active && daysRemaining > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1 mb-3">
                          <p className="text-xs text-blue-800 font-medium">
                            {daysRemaining} days left
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {active ? (
                        <Button
                          onClick={() => handleChatClick(enrollment)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[120px] text-white"
                          size="lg"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      ) : (
                        <>
                          <Link to={`/mentor?id=${enrollment.mentor.id}`}>
                            <Button
                              onClick={() => handleRenewClick(enrollment)}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 min-w-[100px]"
                              size="lg"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Renew
                            </Button>
                          </Link>
                          <Button
                            disabled
                            variant="outline"
                            className="bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed min-w-[100px]"
                            size="lg"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Expired
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Timeline - Show on smaller screens */}
                <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600">Started: </span>
                      <span className="font-medium">
                        {formatDate(enrollment.startDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        {active ? 'Ends: ' : 'Ended: '}
                      </span>
                      <span
                        className={`font-medium ${active ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {formatDate(enrollment.endDate)}
                      </span>
                    </div>
                  </div>

                  {active && daysRemaining > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                      <p className="text-sm text-blue-800 text-center font-medium">
                        {daysRemaining} days remaining
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile Services - Show on smaller screens */}
                <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Services included:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {enrollment.package.services
                      .slice(0, 4)
                      .map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                          <span className="truncate">{service}</span>
                        </div>
                      ))}
                    {enrollment.package.services.length > 4 && (
                      <div className="text-sm text-gray-500 ml-5 col-span-full">
                        +{enrollment.package.services.length - 4} more services
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
