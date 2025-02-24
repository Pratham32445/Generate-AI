import Image from "next/image"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Graphic Designer",
    content:
      "Genimg has revolutionized my workflow. The AI-generated images are incredibly high-quality and save me hours of work.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    content: "Our campaigns have never looked better. Genimg provides us with unique visuals that truly stand out.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    content:
      "I love how easy it is to bring my ideas to life with Genimg. It's like having a professional artist at my fingertips.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-black dark:text-white">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{review.content}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

