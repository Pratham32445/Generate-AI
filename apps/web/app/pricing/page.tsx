import React from "react";
import PricingInfo from "@/components/Pricing";
import Navbar from "@/components/Navbar";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl m-auto pt-[40px]">
        <PricingInfo />
      </div>
    </div>
  );
};

export default Pricing;
