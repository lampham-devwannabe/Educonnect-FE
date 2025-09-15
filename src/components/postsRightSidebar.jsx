'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const PostsRightSidebar = () => {

    const [promos, setPromos] = useState([]);
    useEffect(() => {
        fetch('/api/ads-promo').then(res => res.json()).then(result => setPromos(result.data)).catch(error => console.error(error))
    }, [])


    return (
        <div className="hidden lg:block w-[300px] flex-shrink-0">
            <div className="sticky top-4 space-y-4">
                {
                    promos.filter(prom => prom.isActive).map(prom => {
                        return <div key={prom._id} className="relative h-[280px] rounded-2xl overflow-hidden border border-purple-300 shadow-xl group text-white text-center">

                            <Image
                                width={600}
                                height={600}
                                src={prom.image}
                                alt="Course"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 flex flex-col justify-between px-6 mt-3 z-10">
                                <div> <h2 className="text-2xl font-extrabold mb-2 drop-shadow-lg transition-all duration-300 group-hover:scale-105 text-yellow-400 decoration-yellow-300">
                                    {prom.title}
                                </h2>
                                    <p className="text-white font-semibold text-lg mb-2 drop-shadow-sm transition-all duration-300 group-hover:scale-105 ">
                                        {prom.description}
                                    </p></div>

                                <div className="flex justify-center pb-4">  <Link href={prom.buttonLink}>
                                    <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-yellow-500 hover:scale-105">
                                        {prom.buttonText}
                                    </button>
                                </Link></div>

                            </div>


                            <div className="absolute inset-0 rounded-2xl group-hover:ring-4 group-hover:ring-white/30 transition-all duration-300 pointer-events-none" />
                        </div>
                    }
                    )
                }
            </div>
        </div>
    )
}