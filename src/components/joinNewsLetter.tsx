import React from 'react'

const JoinNewsLetter = () => {
  return (
    <div className="bg-[#1B153E] w-full relative">
      {/* Flower Icon */}
      <div className="absolute left-36 bottom-5 translate-y-1/4 text-purple-200">
        <img
          className="w-12 h-12"
          src="./assets/custom-image/flower-icon.png"
          alt="Flower Icon"
        />
      </div>

      {/* Circle Icon */}
      <div className="absolute right-36 top-2 translate-y-1/4 text-purple-200">
        <img
          className="w-12 h-12"
          src="/assets/custom-image/circle-icon.png"
          alt="Circle Icon"
        />
      </div>

      {/* Content */}
      <div className="container w-full py-20 mx-auto relative lg:flex justify-between items-center">
        <div>
          <h5 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
            Join Our Newsletter
          </h5>
          <p className="text-white mt-2">
            Subscribe our newsletter to get our latest update & news.
          </p>
        </div>

        {/* Input + Button */}
        <div className="flex flex-row flex-end rounded-full bg-white p-1.5 mt-5 lg:mt-0 sm:space-x-4">
          <input
            className="w-full py-2 px-2 text-gray-500 text-md rounded-full bg-white focus-visible:outline-none"
            type="text"
            placeholder="Enter your email here"
          />
          <button className="px-3 lg:px-8 w-fit py-2 mt-0 bg-[--primary] whitespace-nowrap text-white rounded-full hover:bg-teal-500 transition duration-300 text-xs sm:text-base">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinNewsLetter
