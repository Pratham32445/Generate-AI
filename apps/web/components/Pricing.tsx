import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from 'lucide-react'

export default function PricingAndReviews() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-4xl font-bold">${plan.price}<span className="text-xl font-normal">/mo</span></p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <StarIcon className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{plan.buttonText}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center mt-24 mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.content}</p>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  )
}

const pricingPlans = [
  {
    name: "Basic",
    description: "For small teams or offices",
    price: 19,
    features: ["5 users", "Basic support", "1GB storage"],
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    description: "For professional teams",
    price: 49,
    features: ["25 users", "Priority support", "10GB storage", "Advanced analytics"],
    buttonText: "Upgrade to Pro"
  },
  {
    name: "Enterprise",
    description: "For large scale enterprises",
    price: 99,
    features: ["Unlimited users", "24/7 support", "Unlimited storage", "Custom integrations"],
    buttonText: "Contact Sales"
  }
]

const reviews = [
  {
    name: "Alice Johnson",
    title: "CEO at TechCorp",
    content: "This product has transformed our workflow. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Bob Smith",
    title: "Freelance Designer",
    content: "Great value for money. The features are exactly what I needed.",
    rating: 4,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Carol Williams",
    title: "Marketing Manager",
    content: "The customer support is outstanding. They're always there to help.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40"
  }
]
