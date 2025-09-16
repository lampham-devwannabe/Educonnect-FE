'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
} from 'lucide-react'
import latest1Img from '../../public/assets/custom-image/latest1.png'
import latest2Img from '../../public/assets/custom-image/latest3.png'
import { useEffect, useState } from 'react'
import { Erica_One } from 'next/font/google'

const Footer = () => {
  const [post, setPost] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const formData = new FormData()
        formData.set('page', 1)
        formData.set('pagination', 4)
        const res = await fetch('api/post-feed/list', {
          method: 'POST',
          body: formData,
        })
        const postData = await res.json()

        setPost(postData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getPosts()
  }, [])

  return (
    <footer className="bg-[#151339] text-white mt-5 lg:mt-20">
      <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/*=============== GET IN TOUCH! ==============*/}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-6">GET IN TOUCH!</h3>
          <p className="text-sm text-gray-300">
            Fusce varius, dolor tempor interdum tristique bibendum.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a href="https://wa.me/8801401370023" target="_blank">
              <span>+8801754713136</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=smartacademyinfo@gmail.com"
              target="_blank"
            >
              <span>smartacademyinfo@gmail.com</span>
            </a>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white mt-1"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <a href="https://maps.app.goo.gl/sgoqkj92xn6vWmsEA" target="_blank">
              <span>238/A, Gulshan 1, Dhaka - Bangladesh.</span>
            </a>
          </div>
          <div className="flex gap-4 pt-2">
            <a
              target="_blank"
              href="https://www.facebook.com/share/1F2MGc59HE/?mibextid=qi2Omg"
              className="text-white hover:text-gray-300"
            >
              <Facebook size={18} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/arcadexit/"
              className="text-white hover:text-gray-300"
            >
              <Linkedin size={18} />
            </a>
            <Link href="#" className="text-white hover:text-gray-300">
              <Instagram size={18} />
            </Link>
            <a
              target="_blank"
              href="https://www.youtube.com/@ArcadexIT"
              className="text-white hover:text-gray-300"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/*=============== COMPANY INFO ================*/}
        <div>
          <h3 className="text-lg font-bold mb-6">COMPANY INFO</h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Resource Center</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Careers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/mentorlist"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Instructor</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Become A Teacher</span>
              </Link>
            </li>
          </ul>
        </div>

        {/*============ USEFUL LINKS ===============*/}
        <div>
          <h3 className="text-lg font-bold mb-6">USEFUL LINKS</h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/courselist"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>All Courses</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Digital Marketing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Design & Branding</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>Storytelling & Voice Over</span>
              </Link>
            </li>
            <li>
              <Link
                href="/popular-post"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                <span>News & Blogs</span>
              </Link>
            </li>
          </ul>
        </div>

        {/*============ RECENT POST ==========*/}
        <div>
          <h3 className="text-lg font-bold mb-6">RECENT POST</h3>
          <div className="space-y-4">
            {post.slice(0, 2).map(posts => {
              return (
                <div key={posts._id} className="flex gap-3">
                  <Image
                    src={posts.image[0] ? posts.image[0] : '/next.svg'}
                    alt="Arts Integrating"
                    width={150}
                    height={150}
                    className="rounded-md object-cover w-16 h-16"
                  />
                  <div>
                    <Link
                      href={`/popular-post/page?id=${posts._id}`}
                      className="text-sm font-medium hover:text-gray-300"
                    >
                      {posts.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[--primary]"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      {/* <span className="text-xs text-gray-300">12 March, 2025</span> */}
                      <span className="text-xs text-gray-300">
                        {new Date(posts.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* <div className="flex gap-3">
              <Image
                src={latest2Img}
                alt="Arts Integrating"
                width={150}
                height={150}
                className="rounded-md object-cover w-16 h-16"
              />
              <div>
                <Link href="#" className="text-sm font-medium hover:text-gray-300">
                  Development Student Best Achievement
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[--primary]"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span className="text-xs text-gray-300">09 March, 2025</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="py-7 border-t border-gray-700 text-center">
        <span className="text-sm  text-gray-400 ">
          Copyright © 2025{' '}
          <a
            className="text-sky-600"
            href="https://arcadexit.com/"
            target="_blank"
          >
            Smart academy
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
