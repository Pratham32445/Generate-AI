import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/Howitworks";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Marquee3D from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-[130px] md:pt-[120px] text-center">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-6 md:mb-8 inline-block rounded-full bg-[#ffe4d4] px-3 py-1 text-xs md:text-sm opacity-0 animate-fade-up [animation-delay:800ms] text-black">
            Join over 10,000+ Happy customers
          </div>
          <h1 className="mb-3 md:mb-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight opacity-0 animate-fade-up [animation-delay:1000ms]">
            Transform Imagination into{" "}
            <span className="italic text-[#8b1d1d]">Reality</span> with AI
          </h1>
          <p className="mb-8 md:mb-12 text-sm md:text-base text-gray-600 opacity-0 animate-fade-up [animation-delay:1200ms]">
            Generate high-quality images instantly—AI-powered creativity at your
            fingertips.
          </p>
          <ScrollArea className="max-w-6xl whitespace-nowrap">
            <div className="relative mx-auto mb-8 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] max-w-6xl opacity-0 animate-fade-up [animation-delay:1400ms]">
              <div className="absolute left-1/2 flex -translate-x-1/2 transform items-end gap-2 md:gap-4">
                {[
                  "/ashwin3.jpg?height=400&width=300",
                  "/ashwin1.jpg?height=400&width=300",
                  "/pratham2.jpg?height=400&width=300",
                  "/pratham1.jpg?height=400&width=300",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-[150px] w-[100px] sm:h-[200px] sm:w-[140px] md:h-[250px] md:w-[180px] lg:h-[300px] lg:w-[200px] overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-105"
                    style={{
                      transform: `translateY(${Math.sin((i / 5) * Math.PI) * 20}px)`,
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="relative opacity-0 animate-fade-up [animation-delay:2200ms] mb-16 mt-10">
            <Link href={"/dashboard"}>
              <Button className="bg-[#ffb7b7] text-black hover:bg-[#ffb7b7]/90 w-full sm:w-[250px] md:w-[300px] p-6 md:p-8 text-sm md:text-base">
                Try it Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-5xl m-auto px-4">
          <HowItWorks />
          <Pricing />
          <Marquee3D />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
