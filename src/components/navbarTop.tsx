import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const NavbarTop: React.FC = () => {
  return (
    <div className="bg-[#1D1742] hidden lg:block top-0 z-[9999]">
      <div className="container flex gap-5 text-gray-200 justify-between">
        <div className="flex gap-5 text-gray-200 py-3">
          <div className="nav-text flex gap-1 items-center">
            <MdPhone className="text-[--primary] w-4 h-4" />
            <a
              href="https://wa.me/8801754713136"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5 className="text-sm">0987654JQK</h5>
            </a>
          </div>
          <div className="nav-text flex gap-1 items-center">
            <MdEmail className="text-[--primary] w-4 h-4" />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=arcadexit.tech@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5 className="text-sm">toiyeufbt@fbt.edu.vn</h5>
            </a>
          </div>
          <div className="nav-text flex gap-1 items-center">
            <MdLocationOn className="text-[--primary] w-4 h-4" />
            <a
              href="https://maps.app.goo.gl/sgoqkj92xn6vWmsEA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5 className="text-sm">Hoa Lac Hi-tech Park</h5>
            </a>
          </div>
        </div>
        <div className="flex gap-5 bg-[--primary] px-4 items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/share/1F2MGc59HE/?mibextid=qi2Omg"
          >
            <FaFacebook className="cursor-pointer w-4 h-4" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <FaInstagram className="cursor-pointer w-4 h-4" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/arcadexit/"
          >
            <FaLinkedin className="cursor-pointer w-4 h-4" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@ArcadexIT"
          >
            <FaYoutube className="cursor-pointer w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavbarTop
