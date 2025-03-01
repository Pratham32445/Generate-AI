"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

export default function Pricing() {
  return (
    <div className="min-h-screen w-full  text-white py-16">
      <div className="container mx-auto px-6">
        {/* Pricing Section */}
        <h1 className="text-5xl font-extrabold text-center mb-16">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`flex flex-col items-center text-center p-8 bg-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-transform hover:scale-105 ${
                index === 1 ? "border-2 border-[#DEFF00]" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-5xl font-extrabold">{plan.price}</p>
                <ul className="mt-6 space-y-3 text-lg">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <CircleCheckBig className="h-6 w-6 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="w-full">
                <Button onClick={()=>toast("we are working on the pricing section")} className={`w-full p-5 text-lg hover:scale-105 transition-transform ${index == 1 && "bg-[#abc505]"}`}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    description: "Free",
    price: "$0",
    features: ["15 AI potraits", "Basic styles", "24h Support", "Basic export"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    description: "For professional teams",
    price: "$9.99",
    features: [
      "100 AI Portraits",
      "Premium Styles",
      "Priority Support",
      "HD Export",
      "Advanced Editing",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Enterprise",
    description: "For large scale enterprises",
    price: "Custom",
    features: [
      "Unlimited Portraits",
      "Custom Styles",
      "Dedicated Support",
      "API Access",
      "Custom Integration",
    ],
    buttonText: "Get Started",
  },
];
