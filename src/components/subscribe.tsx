import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { DotIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SubscriptionPlan } from '@/models/subscriptionPlan'

import subscribeImg1 from '@assets/custom-image/bronze1.png'
import subscribeImg2 from '@assets/custom-image/gold2.png'
import subscribeImg3 from '@assets/custom-image/silver3.png'

const Subscribe: React.FC = () => {
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 1,
      title: 'Bronze',
      image: subscribeImg1,
      price: 29,
      target: 'For Personal',
      features: ['15 days of subscription', '100 subscribes'],
    },
    {
      id: 2,
      title: 'Gold',
      image: subscribeImg2,
      price: 49,
      target: 'For Personal',
      features: ['15 days of subscription', '100 subscribes'],
    },
    {
      id: 3,
      title: 'Silver',
      image: subscribeImg3,
      price: 39,
      target: 'For Personal',
      features: ['15 days of subscription', '100 subscribes'],
    },
  ]

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex justify-center text-center lg:pt-10 pt-0 pb-10">
        <div>
          <h1 className="font-bold text-3xl lg:text-4xl text-primary">
            Subscribe Now!
          </h1>
          <h5 className="text-lg mt-2 text-gray-600">
            Choose a subscription plan and save money!
          </h5>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subscriptionPlans.map(plan => (
          <Card
            key={plan.id}
            className="w-full rounded-2xl overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:scale-95"
          >
            <Link to="">
              <CardHeader className="items-center mt-3">
                <img
                  src={plan.image}
                  alt={`${plan.title} subscription`}
                  className="w-28 object-cover rounded-tl-2xl rounded-tr-2xl"
                />
              </CardHeader>
              <CardContent className="mt-3 pb-2 px-5">
                <h3 className="text-3xl lg:text-4xl font-bold text-primary uppercase truncate">
                  {plan.title}
                </h3>
                <div className="mt-4">
                  <h3 className="text-xl">{plan.target}</h3>
                </div>
                <h4 className="items-center text-5xl mt-4 text-cyan-400 font-bold">
                  ${plan.price}
                </h4>
                <div className="mt-8 text-center text-gray-600">
                  {plan.features.map((feature, index) => (
                    <h5
                      key={index}
                      className="flex items-center text-xl font-semibold"
                    >
                      <span>
                        <DotIcon className="w-8" />
                      </span>{' '}
                      {feature}
                    </h5>
                  ))}
                </div>
                <button className="w-full text-2xl py-1 mt-4 mb-4 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                  Purchase
                </button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Subscribe
