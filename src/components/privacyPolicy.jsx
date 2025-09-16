'use client'

import React from 'react'
import {
  ShieldCheck,
  Users,
  FileText,
  Lock,
  RefreshCcw,
  UserCheck,
} from 'lucide-react'

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Information We Collect',
      content: (
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Account info: name, email, profile details</li>
          <li>Course progress: enrollments, lessons, certificates</li>
          <li>Community content: posts, comments, reactions</li>
          <li>Device & browser data: for performance and support</li>
          <li>Payment history: processed securely via third-party providers</li>
        </ul>
      ),
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Community and User Guidelines',
      content: (
        <>
          <p className="mt-2">
            We welcome learners of all ages. However, to ensure a safe and
            respectful environment:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>
              Children under 13 should use the platform under parental
              supervision.
            </li>
            <li>Do not post harmful, illegal, or inappropriate content.</li>
            <li>Respect instructors, peers, and the community at all times.</li>
            <li>
              Admins may moderate or remove posts that violate guidelines.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: 'How We Use Your Data',
      content: (
        <p className="mt-2">
          We use your information to manage courses, enhance learning, support
          social features, and improve platform performance.
          <span className="font-medium text-gray-900">
            {' '}
            Your privacy is our priority—we never sell your data.
          </span>
        </p>
      ),
    },
    {
      id: 4,
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      title: 'Your Rights',
      content: (
        <p className="mt-2">
          You may access, edit, or request deletion of your data at any time.
          Contact us at{' '}
          <a
            href="https://arcadexit.com/"
            className="text-blue-600 hover:underline"
          >
            arcadexit.com
          </a>
          .
        </p>
      ),
    },
    {
      id: 5,
      icon: <RefreshCcw className="w-6 h-6 text-blue-600" />,
      title: 'Updates to This Policy',
      content: (
        <p className="mt-2">
          We may revise this policy to reflect changes. You will be notified of
          significant updates through your dashboard or email.
        </p>
      ),
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
            <ShieldCheck className="h-7 w-7" />
            <span className="text-sm uppercase tracking-wider font-semibold">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Your Data, Your Rights
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            This Privacy Policy explains how we handle your personal information
            and community interactions on our educational platform.
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-8">
          {sections.map(section => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold flex items-center gap-3 text-gray-800">
                {section.icon}
                {section.id}. {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{' '}
          <span className="font-medium">Smart Academy</span>. All rights
          reserved.
        </footer>
      </div>
    </div>
  )
}

export default PrivacyPolicy
