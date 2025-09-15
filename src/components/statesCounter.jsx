import { Award, BarChart, GraduationCap, Users } from 'lucide-react';

const StatesCounter = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-6 top:5 lg:top-20">
      <div className="bg-indigo-600 rounded-2xl lg:rounded-full px-9 py-9 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-white p-2 rounded-full ">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h5 className="font-bold text-lg text-white/90">3K+</h5>
            <h5 className="text-xs text-white/90">Successfully Trained</h5>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-white p-2 rounded-full ">
            <BarChart className="w-7 h-7" />
          </div>
          <div>
            <h5 className="font-bold text-lg text-white/90">15K+</h5>
            <h5 className="text-xs text-white/90">Classes Completed</h5>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-white p-2 rounded-full ">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h5 className="font-bold text-lg text-white/90">97K+</h5>
            <h5 className="text-xs text-white/90">Classes Completed Satisfaction Rate</h5>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-white p-2 rounded-full ">
             <Users className="w-7 h-7" />
          </div>
          <div>
            <h5 className="font-bold text-lg text-white/90">102K+</h5>
            <h5 className="text-xs text-white/90">Students Community</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatesCounter;