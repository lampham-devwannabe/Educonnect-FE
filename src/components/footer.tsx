import React, { useEffect, useState } from 'react'
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
} from 'lucide-react'

interface Post {
  _id: string
  title: string
  image: string[]
  createdAt: string
}

const Footer: React.FC = () => {
  const [post, setPost] = useState<Post[]>([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const formData = new FormData()
        formData.set('page', '1')
        formData.set('pagination', '4')

        const res = await fetch('/api/post-feed/list', {
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
            <span className="text-white">📞</span>
            <a
              href="https://wa.me/8801401370023"
              target="_blank"
              rel="noreferrer"
            >
              +8801754713136
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white">📧</span>
            <a
              href="mailto:smartacademyinfo@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              smartacademyinfo@gmail.com
            </a>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-white">📍</span>
            <a
              href="https://maps.app.goo.gl/sgoqkj92xn6vWmsEA"
              target="_blank"
              rel="noreferrer"
            >
              238/A, Gulshan 1, Dhaka - Bangladesh.
            </a>
          </div>
          <div className="flex gap-4 pt-2">
            <a
              target="_blank"
              href="https://www.facebook.com/share/1F2MGc59HE/?mibextid=qi2Omg"
              rel="noreferrer"
              className="text-white hover:text-gray-300"
            >
              <Facebook size={18} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/arcadexit/"
              rel="noreferrer"
              className="text-white hover:text-gray-300"
            >
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Instagram size={18} />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/@ArcadexIT"
              rel="noreferrer"
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
              <a
                href="/about"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                About Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Resource Center
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Careers
              </a>
            </li>
            <li>
              <a
                href="/mentorlist"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Instructor
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Become A Teacher
              </a>
            </li>
          </ul>
        </div>

        {/*============ USEFUL LINKS ===============*/}
        <div>
          <h3 className="text-lg font-bold mb-6">USEFUL LINKS</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="/courselist"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                All Courses
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Digital Marketing
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Design & Branding
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                Storytelling & Voice Over
              </a>
            </li>
            <li>
              <a
                href="/popular-post"
                className="flex items-center gap-2 text-sm hover:text-gray-300"
              >
                <ArrowRight size={16} />
                News & Blogs
              </a>
            </li>
          </ul>
        </div>

        {/*============ RECENT POST ==========*/}
        <div>
          <h3 className="text-lg font-bold mb-6">RECENT POST</h3>
          <div className="space-y-4">
            {post.slice(0, 2).map(p => (
              <div key={p._id} className="flex gap-3">
                <img
                  src={p.image[0] || '/default.png'}
                  alt={p.title}
                  className="rounded-md object-cover w-16 h-16"
                />
                <div>
                  <a
                    href={`/popular-post/page?id=${p._id}`}
                    className="text-sm font-medium hover:text-gray-300"
                  >
                    {p.title}
                  </a>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-300">
                      {new Date(p.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="py-7 border-t border-gray-700 text-center">
        <span className="text-sm text-gray-400">
          Copyright © 2025{' '}
          <a
            className="text-sky-600"
            href="https://arcadexit.com/"
            target="_blank"
            rel="noreferrer"
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
