import React from 'react'
import { Award, BarChart, GraduationCap, Users } from 'lucide-react'

interface StatItem {
  id: number
  icon: React.ReactNode
  count: string
  label: string
}

const StatesCounter: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      icon: <GraduationCap className="w-7 h-7" />,
      count: '3K+',
      label: 'Successfully Trained',
    },
    {
      id: 2,
      icon: <BarChart className="w-7 h-7" />,
      count: '15K+',
      label: 'Classes Completed',
    },
    {
      id: 3,
      icon: <Award className="w-7 h-7" />,
      count: '97K+',
      label: 'Classes Completed Satisfaction Rate',
    },
    {
      id: 4,
      icon: <Users className="w-7 h-7" />,
      count: '102K+',
      label: 'Students Community',
    },
  ]

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-6 top:5 lg:top-20">
      <div className="bg-indigo-600 rounded-2xl lg:rounded-full px-9 py-9 flex flex-wrap justify-between items-center gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="flex items-center gap-3 text-gray-600">
            <div className="bg-white p-2 rounded-full">{stat.icon}</div>
            <div>
              <h5 className="font-bold text-lg text-white/90">{stat.count}</h5>
              <h5 className="text-xs text-white/90">{stat.label}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatesCounter
