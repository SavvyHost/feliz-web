import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import ThanksInquire from "../ThanksInquire";
import { useRouter } from "next/router";

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
  onChange: (data: Partial<TravelDetailsProps["formData"]>) => void;
  onSubmit: () => void;
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
  onSubmit,
}) => {
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: formData.name || "",
      email: formData.email || "",
      nationality: formData.nationality || "",
      phone: formData.phone || "",
      adults: formData.adults || 2,
      children: formData.children || 0,
      infants: formData.infants || 0,
      budget: formData.budget || "",
      flightOffer: formData.flightOffer || false,
      additionalInfo: formData.additionalInfo || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      onSubmit();
    },
  });

  useEffect(() => {
    const hasChanges = Object.keys(formik.values).some(
      (key) => formik.values[key] !== formData[key]
    );

    if (hasChanges) {
      onChange(formik.values);
    }
  }, [formik.values, onChange]);

  useEffect(() => {
    const validateForm = async () => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length === 0) {
        onChange(formik.values);
      }
    };
    validateForm();
  }, [formik.values]);

  return (
    <div className="font-sans w-full mx-auto lg:px-40 bg-white rounded-xl overflow-hidden">
      <h2 className="text-3xl text-green-600 text-center mb-4 font-semibold">
        Tell Us About Your Travel Plans
      </h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              name="nationality"
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Select your Nationality *
              </option>
              <option value="any">Any</option>
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
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["adults", "children", "infants"].map((type) => (
            <div
              key={type}
              className="bg-white border border-gray-200 rounded-lg p-2"
            >
              <label className="text-sm font-medium mb-2 block">
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <span className="text-xs text-white  ml-1">
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
                  className="bg-gray-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none hover:bg-green-200 transition-colors"
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
                  className="bg-gray-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none hover:bg-green-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-4">
          <div className="flex-grow md:w-1/2">
            <select
              name="budget"
              className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
              value={formik.values.budget}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Your average budget per person *
              </option>
              <option value="any">Any</option>
            </select>
            {formik.errors.budget && formik.touched.budget && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.budget}
              </div>
            )}
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 md:ml-4 md:w-auto">
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
        </div>

        <textarea
          name="additionalInfo"
          placeholder="Additional Info (Optional)"
          rows={4}
          className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-transparent transition-all"
          value={formik.values.additionalInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </form>
    </div>
  );
};

export default TravelDetails;

// import React, { useState } from "react";
// import { Form, Formik } from "formik";
// import { Minus, Plus } from "lucide-react";
// import PhoneInput from "react-phone-number-input";
// import dayjs from "dayjs";
// import { Button } from "@mui/material";

// import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
// import SelectNationality from "@/components/molecules/selects/SelectNationality";
// import { useMutate } from "@/hooks/UseMutate";
// import { Spinner } from "../../atoms/UI/Spinner";
// import { notify } from "@/utils/toast";

// import { FaWhatsapp } from "react-icons/fa";
// import DatePickerInput from "@/components/atoms/SearchExcursions/DatePickerInput";

// interface MainDataBookingFormProps {
//   DetailTour: { id: number };
//   setIsThanksVisible: (visible: boolean) => void;
// }

// const TravelDetails: React.FC<MainDataBookingFormProps> = ({
//   DetailTour,
//   setIsThanksVisible,
// }) => {
//   const { mutate, isPending } = useMutate({
//     mutationKey: ["bookings"],
//     endpoint: `bookings`,
//     onSuccess: () => {
//       setIsThanksVisible(true);
//     },
//     onError: (err) => {
//       notify("error", err?.response?.data?.message);
//     },
//     formData: true,
//   });

//   const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
//   const [openPassengers, setOpenPassengers] = useState(false);

//   const handleDateChange = (newDate: dayjs.Dayjs | null) => {
//     setSelectedDate(newDate);
//   };

//   const initialValues = {
//     name: "",
//     email: "",
//     nationality_id: "",
//     phone: "",
//     start_at: "",
//     num_of_adults: 1,
//     num_of_children: 0,
//     num_of_infants: 0,
//     tour_id: DetailTour?.id,
//     duration: "1",
//     phone_code: "+20",
//   };

//   const handleSubmit = (values, { setSubmitting }) => {
//     setSubmitting(false);
//   };

//   const handleConfirmBooking = (values) => {
//     const month = selectedDate ? selectedDate.format("MMM") : "";
//     mutate({
//       ...values,
//       phone: values.phone.slice(2),
//       start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
//       month: month,
//     });
//   };

//   return (
//     <div className="relative p-4">
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
//           <Form>
//             {/* Date Picker */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <DatePickerInput

//                 selectedDate={selectedDate}
//                 onDateChange={handleDateChange}
//                 mobileWidth="100%"
//                 laptopWidth="100%"
//                 height="40px"
//                 labelProps={{
//                   fontSize: "14px",
//                   color: "rgba(0, 0, 0, 0.6)",
//                   transform: "translate(14px, 12px) scale(1)",
//                 }}
//               />

//               {/* Passenger Selection */}
//               <div className="relative">
//                 <Button
//                   variant="outlined"
//                   className="bg-white text-black border-gray-200 hover:border-gray-300 hover:bg-gray-200 w-full"
//                   onClick={() => setOpenPassengers(!openPassengers)}
//                 >
//                   {`Adults: ${values.num_of_adults}, Children: ${values.num_of_children}, Infants: ${values.num_of_infants}`}
//                 </Button>

//                 {openPassengers && (
//                   <div className="absolute top-full left-0 right-0 z-10 bg-white p-4 rounded-md shadow-md mt-2 max-h-60 overflow-y-auto">
//                     {[
//                       { label: "Adults", name: "num_of_adults" },
//                       { label: "Children", name: "num_of_children" },
//                       { label: "Infants", name: "num_of_infants" },
//                     ].map(({ label, name }) => (
//                       <div
//                         key={label}
//                         className="flex justify-between items-center mb-4"
//                       >
//                         <span>{label}</span>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setFieldValue(name, Math.max(0, values[name] - 1))
//                             }
//                             className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
//                           >
//                             <Minus size={16} />
//                           </button>
//                           <span>{values[name]}</span>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setFieldValue(name, values[name] + 1)
//                             }
//                             className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
//                           >
//                             <Plus size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                     <div className="mt-4">
//                       <button
//                         onClick={() => setOpenPassengers(false)}
//                         type="button"
//                         className="w-full p-3 bg-green-700 text-white rounded-md hover:bg-green-900"
//                       >
//                         Apply
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <BaseInputField
//                 name="name"
//                 label="Name"
//                 placeholder="Enter your name"
//                 value={values.name}
//                 onChange={(e) => setFieldValue("name", e.target.value)}
//               />

//               <BaseInputField
//                 name="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 type="email"
//                 value={values.email}
//                 onChange={(e) => setFieldValue("email", e.target.value)}
//               />

//               <SelectNationality
//                 name="nationality_id"
//                 label="Nationality"
//                 placeholder="Select your nationality"
//                 value={values.nationality_id}
//                 onChange={(value) => setFieldValue("nationality_id", value)}
//               />

//               <div className="relative">
//                 <p className="mb-3 text-base text-gray-600">Phone Number</p>
//                 <PhoneInput
//                   placeholder="Enter your phone number"
//                   value={values.phone}
//                   onChange={(value) => setFieldValue("phone", value)}
//                   defaultCountry="EG"
//                   className="w-full p-3 border border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleConfirmBooking(values)}
//               className="mt-4 w-full bg-green-600 hover:bg-green-900"
//             >
//               Confirm Booking <FaWhatsapp size={20} className="ml-2" />
//             </Button>
//           </Form>
//         )}
//       </Formik>
//       {isPending && <Spinner />}
//     </div>
//   );
// };

// export default TravelDetails;
