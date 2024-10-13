import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { useRouter } from "next/router";
import CitySelection from "@/components/molecules/inquiredetails/CitySelection";
import TimeDetails from "@/components/molecules/inquiredetails/TimeDetails";
import TravelDetails from "@/components/molecules/inquiredetails/TravelDetails";
import ThanksInquire from "@/components/molecules/ThanksInquire";

const TravelStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationality: "",
    phone: "",
    adults: 2,
    children: 0,
    infants: 0,
    budget: "",
    flightOffer: false,
    additionalInfo: "",
    selectedCities: [], // Ensure this is the correct state property
    travelDetails: {},
  });

  const steps = ["Choose City", "City Details", "Travel Details"];

  const handleNext = () => {
    // Check if we are on the "Choose City" step
    if (activeStep === 0 && formData.selectedCities.length === 0) {
      alert("Please select at least one city to continue.");
      return; // Prevent moving to the next step
    }

    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (stepData: any) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CitySelection formData={formData} onChange={handleFormChange} />
        );
      case 1:
        return <TimeDetails formData={formData} onChange={handleFormChange} />;
      case 2:
        return (
          <TravelDetails formData={formData} onChange={handleFormChange} />
        );
      default:
        return <SuccessComponent />;
    }
  };

  const handleCloseThanks = () => {
    setIsDone(false);
    router.push("/");
  };

  const handleFinish = () => {
    setIsDone(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const SuccessComponent = () => (
    <div className="">
      <ThanksInquire
        onClose={handleCloseThanks}
        message="Thank you for your submission!"
      />
    </div>
  );

  return (
    <div className="container mx-auto lg:px-24 mt-24">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className=" p-4">
        {isDone ? <SuccessComponent /> : getStepContent(activeStep)}
      </div>

      {!isDone && (
        <div className="sticky bottom-0 left-0 w-full bg-green-100 shadow-lg flex justify-between p-4">
          <Button
            disabled={activeStep === 0 || activeStep === 2}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-400"
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleFinish : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelStepper;
