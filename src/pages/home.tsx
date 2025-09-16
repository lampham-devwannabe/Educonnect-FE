import React from 'react'
import 'tailwindcss'
export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
        Learn with Smart Academy
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
          Develop your skill with best tutors
        </span>
      </h1>

      <p className="mt-5 text-lg text-gray-600 text-center">
        A collection of notes, tips, and tutorials from a developers desk.
        Discover hands-on guides, practical solutions, and insights into my
        coding journey and projects.
      </p>

      {/* Input search */}
      <div className="flex flex-wrap justify-center mt-10">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      {/* Card example */}
      <div className="flex flex-wrap justify-center mt-10">
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Product card */}
      <div className="flex font-sans mt-10">
        <div className="flex-none w-56 relative">
          <img
            src="/kids-jumpsuit.jpg"
            alt="Kids Jumpsuit"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto font-medium text-slate-900">
              Kids Jumpsuit
            </h1>
            <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
              $39.00
            </div>
            <div className="text-sm font-medium text-slate-400">In stock</div>
          </div>

          {/* Size selection */}
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm font-bold">
              {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                <label key={i}>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value={size.toLowerCase()}
                    defaultChecked={i === 0}
                  />
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button
                className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                type="submit"
              >
                Buy now
              </button>
              <button
                className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
                type="button"
              >
                Add to bag
              </button>
            </div>
            <button
              className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50"
              type="button"
              aria-label="Like"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          </div>

          <p className="text-sm text-slate-500">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>
    </section>
  )
}
