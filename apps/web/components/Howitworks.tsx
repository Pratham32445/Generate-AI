import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, Zap } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account in just a few clicks.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />,
    },
    {
      title: "Invite Your Team",
      description: "Add your team members and start collaborating.",
      icon: <Users className="h-12 w-12 text-primary" />,
    },
    {
      title: "Boost Productivity",
      description: "Use our tools to streamline your workflow.",
      icon: <Zap className="h-12 w-12 text-primary" />,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card text-card-foreground">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{step.icon}</div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
