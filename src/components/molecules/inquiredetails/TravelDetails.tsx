import { Button } from "@mui/material";
import React from "react";
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
      // Handle form submission logic
      onChange(values); // Call onChange to update the parent state
    },
  });

  return (
    <div className="font-sans w-full mx-auto lg:px-40 bg-white  rounded-xl overflow-hidden my-12 p-8">
      <h2 className="text-3xl text-green-600 text-center mb-8 font-semibold">
        Tell Us About Your Travel Plans
      </h2>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              className="w-full bg-white border border-green-200 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
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
              className="w-full bg-white border border-green-200 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <select
              name="nationality"
              className="w-full bg-white border border-green-200 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Select your Nationality *
              </option>
              <option value="any">Any</option>
              {/* Add more nationality options here */}
            </select>
            {formik.errors.nationality && formik.touched.nationality && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.nationality}
              </div>
            )}
          </div>
          <div>
            <PhoneInput
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              placeholder="Phone Number *"
              defaultCountry="EG"
              className="w-full bg-white border border-green-200 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["adults", "children", "infants"].map((type) => (
            <div key={type} className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium mb-2 block">
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <span className="text-xs text-green-500 ml-1">
                  {type === "adults"
                    ? "(12+)"
                    : type === "children"
                    ? "(2-11)"
                    : "(0-2)"}
                </span>
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue(
                      type,
                      Math.max(formik.values[type] - 1, 0)
                    )
                  }
                  className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none hover:bg-green-200 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium">
                  {formik.values[type]}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue(type, formik.values[type] + 1)
                  }
                  className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none hover:bg-green-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <select
            name="budget"
            className="w-full bg-green-50 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
            value={formik.values.budget}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              Your average budget per person *
            </option>
            <option value="any">Any</option>
            {/* Add more budget options here */}
          </select>
          {formik.errors.budget && formik.touched.budget && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.budget}
            </div>
          )}
          <small className="block text-sm mt-2 text-green-500">
            Per person (international flights NOT included)
          </small>
        </div>

        <div className="flex items-center bg-green-50 rounded-lg p-4">
          <input
            type="checkbox"
            id="flightOffer"
            name="flightOffer"
            checked={formik.values.flightOffer}
            onChange={formik.handleChange}
            className="mr-3 h-5 w-5 text-green-600 focus:ring-transparent border-green-300 rounded"
          />
          <label htmlFor="flightOffer" className="text-sm">
            Add flight offer to your vacation package
          </label>
        </div>

        <textarea
          name="additionalInfo"
          placeholder="Additional Info (Optional)"
          rows={4}
          className="w-full bg-green-50 rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
          value={formik.values.additionalInfo}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          className="w-full bg-green-600 py-3 text-white font-medium text-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
        >
          Submit Inquiry
        </Button>
      </form>
    </div>
  );
};

export default TravelDetails;
