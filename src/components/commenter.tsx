import React from 'react'

interface Comment {
  name: string
  username: string
  avatar: string
  text: string
}

const comments: Comment[] = [
  {
    name: 'John Doe',
    username: '@jonedoe',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    text: 'The courses on Tutor Plans are incredibly detailed and well-organized. As a student looking to enhance my skills in various subjects, I found exactly what I needed here. The content is thorough and the lessons are easy to follow, making learning a breeze.',
  },
  {
    name: 'Jane Smith',
    username: '@jenismith',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    text: "I love the variety of mentors available on this platform. There's truly something for everyone, no matter what you're interested in learning. The mentors are knowledgeable and passionate, which makes the learning experience enjoyable and rewarding.",
  },
  {
    name: 'Mike Brown',
    username: '@mikebrown',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    text: "The online sessions are very interactive and engaging. I feel like I'm in a real classroom with the level of interaction I get from my mentors and peers. This platform has significantly enhanced my learning experience.",
  },
  {
    name: 'Sarah Wilson',
    username: '@sarahwilson',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    text: "Uploading and managing my courses as a mentor on Tutor Plans is seamless and efficient. The platform provides all the tools I need to create high-quality courses and engage with my students. It's a great way to share my expertise and help others grow.",
  },
  {
    name: 'Emma Jones',
    username: '@emmajones',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    text: "I appreciate the flexibility of learning at my own pace with the video lessons on Tutor Plans. The quality of the videos is excellent, and I can revisit the lessons anytime I need a refresher. It's perfect for my busy schedule.",
  },
  {
    name: 'Olivia Davis',
    username: '@oliviadavis',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    text: "I've gained so much knowledge and confidence from the courses on Tutor Plans. The mentors are supportive and provide valuable feedback that helps me improve. I feel well-prepared to apply what I've learned in real-life situations.",
  },
  {
    name: 'Noah Wilson',
    username: '@noahwilson',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    text: 'The mentor-student interaction on Tutor Plans is fantastic. I receive personalized feedback that is invaluable for my learning process. The ability to communicate directly with my mentors has greatly enhanced my understanding of the subjects.',
  },
  {
    name: 'Ava Thomas',
    username: '@avathomas',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    text: "The quality of content on Tutor Plans is top-notch. I feel like I'm getting real value for my money with the comprehensive and well-structured courses.",
  },
]

const Commenter: React.FC = () => {
  return (
    <div className="container max-w-7xl mx-auto gap-3">
      <h3 className="text-gray-800 py-12 lg:pt-20 pt-8 text-3xl text-center font-bold">
        What people think about us.
      </h3>

      <div className="md:columns-2 lg:columns-3 gap-6 sm:p-1 mt-2">
        {comments.map((c, i) => (
          <div key={i} className="animate-in zoom-in duration-200">
            <div className="ring-1 rounded-lg flex flex-col space-y-2 p-4 break-inside-avoid mb-6 bg-white hover:ring-2 ring-gray-300 hover:ring-sky-400 transform duration-200 hover:shadow-sky-200 hover:shadow-md relative">
              <div className="flex flex-col relative">
                <div className="flex justify-between">
                  <div className="flex space-x-6">
                    <div className="flex space-x-4 flex-shrink-0 w-52">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-sm">{c.username}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="whitespace-pre-line break-inside-avoid-page">
                  {c.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Commenter
