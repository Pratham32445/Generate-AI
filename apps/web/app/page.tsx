import { DarkModeToggle } from "@/components/Darkmodetoggle";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 pt-[100px] text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 inline-block rounded-full bg-[#ffe4d4] px-4 py-1 text-sm opacity-0 animate-fade-up [animation-delay:800ms] text-black">
            Join over 10,000+ Happy customers
          </div>
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight opacity-0 animate-fade-up [animation-delay:1000ms] md:text-6xl">
            Transform Imagination into{" "}
            <span className="italic text-[#8b1d1d]">Reality</span> with AI
          </h1>
          <p className="mb-12 text-gray-600 opacity-0 animate-fade-up [animation-delay:1200ms]">
            Generate high-quality images instantly—AI-powered creativity at your
            fingertips.
          </p>
          {/* Image Gallery */}
          <div className="relative mx-auto mb-8 h-[300px] max-w-5xl opacity-0 animate-fade-up [animation-delay:1400ms] md:h-[400px]">
            <div className="absolute left-1/2 flex -translate-x-1/2 transform items-end gap-4">
              {[
                "/first.jpeg?height=400&width=300",
                "/second.jpeg?height=400&width=300",
                "/third.jpg?height=400&width=300",
                "/fourth.avif?height=400&width=300",
                "/fifth.webp?height=400&width=300",
                "/sixth.png?height=400&width=300",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative h-[250px] w-[180px] overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-105 md:h-[300px] md:w-[200px]"
                  style={{
                    transform: `translateY(${Math.sin((i / 5) * Math.PI) * 40}px)`,
                    animationDelay: `${1600 + i * 200}ms`,
                  }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* CTA Section */}
          <div className="relative opacity-0 animate-fade-up [animation-delay:2200ms]">
            <span className="mb-4 block text-sm">Free for 24hrs</span>
            <Button className="bg-[#ffb7b7] text-black hover:bg-[#ffb7b7]/90">
              Try it Now
            </Button>
          </div>{" "}
        </div>
      </main>
    </div>
  );
};

export default Home;
