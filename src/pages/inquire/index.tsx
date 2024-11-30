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
    selectedCities: [],
    approximateMonth: "",
    duration: "",
    selectedDate: null,
    // other fields...
  });

  const steps = ["Choose City", "City Details", "Travel Details"];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    scrollToTop();

    if (activeStep === 0 && !isStep1Complete()) {
      alert("Please select at least one city to continue.");
      return;
    }

    if (activeStep === 1 && !isStep2Complete()) {
      alert("Please select a travel date option to continue.");
      return;
    }

    if (activeStep === 2 && !isStep3Complete()) {
      alert("Please fill in all travel details to finish.");
      return;
    }

    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      handleFinish();
    }
  };

  const isStep1Complete = () => {
    return formData.selectedCities.length > 0;
  };

  const isStep2Complete = () => {
    // Validate if an exact date or an approximate date and duration are selected
    return (
      formData.selectedDate !== null ||
      (formData.approximateMonth !== "" && formData.duration !== "")
    );
  };

  const isStep3Complete = () => {
    const requiredFields = ["name", "email", "nationality", "phone", "budget"];
    return requiredFields.every((field) => formData[field]);
  };

  const handleBack = () => {
    scrollToTop();
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
          <TravelDetails
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFinish}
          />
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
    console.log("Submitting form data:", formData);
    setIsDone(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const SuccessComponent = () => (
    <div>
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

      <div className="p-4">
        {isDone ? <SuccessComponent /> : getStepContent(activeStep)}
      </div>

      {!isDone && (
        <div className="sticky bottom-0 left-0 w-full bg-green-100 shadow-lg flex justify-between p-4">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="text-green-500"
          >
            Back
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-400"
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !isStep1Complete()) ||
              (activeStep === 1 && !isStep2Complete()) ||
              (activeStep === 2 && !isStep3Complete())
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
