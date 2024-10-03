import React from "react";
import Attractions from "../molecules/Attractions/Attractions";
import CtaSection from "../molecules/CTA/CtaSection";

type Props = {};

const CallToActionSection = (props: Props) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
        CTA Section
      </div>
      <div>
        <CtaSection />
      </div>
    </div>
  );
};

export default CallToActionSection;
