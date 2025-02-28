import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Boxes, BrainCog, Dumbbell } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Train a Model",
      description:
        "Create a set of photos with different gestures and send them to us during Training.",
      icon: <Dumbbell className="h-12 w-12 text-primary" />,
    },
    {
      title: "Generate Images",
      description:
        "Give the suitable prompt and model, and we will generate the image according to the prompt.",
      icon: <BrainCog className="h-12 w-12 text-primary" />,
    },
    {
      title: "Generate from Pack",
      description: "Select a pack of your choice, and we will generate different photos.",
      icon: <Boxes className="h-12 w-12 text-primary" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground transform transition duration-300 hover:scale-110 shadow-md hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{step.icon}</div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
