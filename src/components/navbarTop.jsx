import { FacebookIcon, InstagramIcon, LinkedinIcon, Mail, MapPin, PhoneCall, YoutubeIcon } from "lucide-react"
import Link from "next/link"

const NavbarTop = () => {

    return (
        <div className="bg-[#1D1742] hidden lg:block top-0 z-[9999]">
            <div className="container flex gap-5 text-gray-200 justify-between">
                <div className="flex gap-5 text-gray-200  py-3">
                    <div className="nav-text flex gap-1 items-center">
                        <PhoneCall className="text-[--primary] w-4 h-4" />
                        <a href="https://wa.me/8801754713136" target="_blank">
                            <h5 className="text-sm">+8801754713136</h5>
                        </a>
                    </div>
                    <div className="nav-text flex gap-1 items-center">
                        <Mail className="text-[--primary] w-4 h-4" />
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=arcadexit.tech@gmail.com" target="_blank">
                            <h5 className="text-sm">arcadexit.tech@gmail.com</h5>
                        </a>



                    </div>
                    <div className="nav-text flex gap-1 items-center">
                        <MapPin className="text-[--primary] w-4 h-4" />
                        <a href="https://maps.app.goo.gl/sgoqkj92xn6vWmsEA" target="_blank"><h5 className="text-sm">238/A, Gulshan 1, Dhaka - Bangladesh.</h5></a>
                    </div>

                </div>
                <div className="flex gap-5 bg-[--primary] px-4 items-center">
                    <a target="_blank" href="https://www.facebook.com/share/1F2MGc59HE/?mibextid=qi2Omg"><FacebookIcon className="cursor-pointer w-4 h-4" /></a>
                    <Link href="#"><InstagramIcon className="cursor-pointer w-4 h-4" /></Link>
                    <a target="_blank" href="https://www.linkedin.com/company/arcadexit/"><LinkedinIcon className="cursor-pointer w-4 h-4" /></a>
                    <a target="_blank" href="https://www.youtube.com/@ArcadexIT"><YoutubeIcon className="cursor-pointer w-4 h-4" /></a>
                </div>
            </div>
        </div>
    )
}

export default NavbarTop