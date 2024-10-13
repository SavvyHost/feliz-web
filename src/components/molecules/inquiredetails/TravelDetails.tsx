import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react"; // Import useState to manage snackbar state
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";

interface TravelDetailsProps {
  formData: {
    name: string;
    email: string;
    nationality: string;
    phone: string;
    adults: number;
    children: number;
    infants: number;
    budget: string;
    flightOffer: boolean;
    additionalInfo: string;
  };
  onChange: (data: Partial<TravelDetailsProps["formData"]>) => void; // Define onChange prop type
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  nationality: Yup.string().required("Please select your nationality"),
  phone: Yup.string().required("Phone number is required"),
  budget: Yup.string().required("Please select your average budget"),
});

const TravelDetails: React.FC<TravelDetailsProps> = ({
  formData,
  onChange,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility

  const formik = useFormik({
    initialValues: {
      name: formData.name,
      email: formData.email,
      nationality: formData.nationality,
      phone: formData.phone,
      adults: formData.adults || 2,
      children: formData.children || 0,
      infants: formData.infants || 0,
      budget: formData.budget,
      flightOffer: formData.flightOffer || false,
      additionalInfo: formData.additionalInfo || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
      onChange(values); // Call onChange to update the parent state
      setOpenSnackbar(true); // Show success message
    },
  });

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false); // Close snackbar
  };

  return (
    <div className="font-sans w-full mx-auto lg:px-40 bg-white rounded-xl overflow-hidden">
      <h2 className="text-3xl text-green-600 text-center mb-4 font-semibold">
        Tell Us About Your Travel Plans
      </h2>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        {/* Form fields here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Rest of the form fields... */}

        <Button
          type="submit"
          variant="contained"
          className="w-full bg-green-600 py-3 text-white font-medium text-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
        >
          Submit Inquiry
        </Button>
      </form>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your inquiry has been submitted successfully!"
      />
    </div>
  );
};

export default TravelDetails;
