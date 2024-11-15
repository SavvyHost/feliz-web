import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Minus, Plus, X } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { Modal, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@/components/atoms/UI/Spinner";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import DatePickerInput from "@/components/atoms/SearchExcursions/DataPickerInput";
import { notify } from "@/utils/toast";
import { useMutate } from "@/hooks/UseMutate";

const MainDataBookingForm = ({
  DetailTour,
  setIsThanksVisible,
  isDatePickerOpen = false,
}) => {
  const { mutate, isPending } = useMutate({
    mutationKey: ["bookings"],
    endpoint: `bookings`,
    onSuccess: () => {
      setIsThanksVisible(true);
      setIsModalOpen(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPassengers, setOpenPassengers] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDetails, setPriceDetails] = useState({});

  const handleDateChange = (newDate) => {
    setOpenPassengers(!openPassengers);
    setSelectedDate(newDate);
    setShowValidationAlert(false);
  };

  const initialValues = {
    name: "",
    email: "",
    nationality_id: "",
    phone: "",
    start_at: "",
    num_of_adults: 2,
    num_of_children: 0,
    num_of_infants: 0,
    tour_id: DetailTour?.id,
    duration: "1",
    phone_code: "+20",
  };

  const calculateTotalPrice = (values) => {
    const { min_price, discounts } = DetailTour || {};
    const { num_of_adults, num_of_children, num_of_infants } = values;

    const adultPrice = (num_of_adults * min_price).toFixed(2); // Format to 2 decimal places
    const childrenPrice = (num_of_children * (min_price * 0.7)).toFixed(2); // Format to 2 decimal places
    const infantsPrice = (num_of_infants * (min_price * 0.5)).toFixed(2); // Format to 2 decimal places

    const total = (
      parseFloat(adultPrice) +
      parseFloat(childrenPrice) +
      parseFloat(infantsPrice)
    ).toFixed(2); // Calculate total and format to 2 decimal places
    setTotalPrice(total);
    setPriceDetails({
      adultPrice,
      childrenPrice,
      infantsPrice,
      total,
      discount: (discounts || 0).toFixed(2), // Format discount to 2 decimal places
    });
  };

  const handleOpenModal = (values) => {
    if (!selectedDate) {
      setShowValidationAlert(true);
      notify("error", "Please select a date and Passengers before proceeding.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (values) => {
    const month = selectedDate ? selectedDate.format("MMM") : "";
    mutate({
      ...values,
      phone: values.phone.slice(2),
      start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
      month: month,
    });
  };

  return (
    <div className="relative">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <Form>
            {showValidationAlert && ""}

            <DatePickerInput
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              isOpen={isDatePickerOpen} // Pass the prop to DatePickerInput
              mobileWidth="100%"
              laptopWidth="100%"
              height="40px"
              labelProps={{
                fontSize: "19px",
                color: "smoke",
                transform: "translate(14px, 8px) scale(1)",
              }}
            />

            <div className="mt-4 relative">
              <div
                className="hover:bg-gray-100 cursor-pointer bg-white border-2 border-gray-300 p-2 flex flex-wrap justify-around items-center text-base font-semibold rounded-lg text-gray-500"
                onClick={() => setOpenPassengers(!openPassengers)}
              >
                <span className="break-words w-full">
                  Adults: {values.num_of_adults}, Children:{" "}
                  {values.num_of_children}, Infants: {values.num_of_infants}
                </span>
              </div>

              {openPassengers && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white p-4 rounded-md shadow-md mt-2">
                  {[
                    {
                      label: "Adults (17-99)",
                      name: "num_of_adults",
                      min: 1,
                      max: 15,
                      initial: 2,
                    },
                    {
                      label: "Children (3-16)",
                      name: "num_of_children",
                      min: 0,
                      max: 15,
                      initial: 0,
                    },
                    {
                      label: "Infants (0-2)",
                      name: "num_of_infants",
                      min: 0,
                      max: 15,
                      initial: 0,
                    },
                  ].map(({ label, name, min, max, initial }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <span>{label}</span>
                        <div className="text-sm text-gray-500">
                          Minimum: {min}, Maximum: {max}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.max(min, values[name] - 1))
                          }
                          className="p-2 bg-gray-100 text-blue-600 rounded-full flex items-center justify-center focus:outline-none hover:bg-blue-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{values[name] ?? initial}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.min(max, values[name] + 1))
                          }
                          className="p-2 bg-gray-100 text-blue-600 rounded-full flex items-center justify-center focus:outline-none hover:bg-blue-200 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setOpenPassengers(false);
                        calculateTotalPrice(values);
                      }}
                      type="button"
                      className="w-full p-3 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition duration-150"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {totalPrice > 0 && (
              <div className="mt-4 p-4 border rounded-md bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-700">
                  Price Summary
                </h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>Adults: ${priceDetails.adultPrice}</li>
                  <li>Children: ${priceDetails.childrenPrice}</li>
                  <li>Infants: ${priceDetails.infantsPrice}</li>
                </ul>
                <div className="flex justify-between font-bold mt-3 text-gray-800">
                  <span>Total Price:</span>
                  <span>${priceDetails.total}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Discount: ${priceDetails.discount}
                </div>
              </div>
            )}

            <Button
              variant="contained"
              onClick={() => handleOpenModal(values)}
              className="mt-4 w-full bg-blue-900 hover:bg-blue-600"
            >
              Book Now
            </Button>

            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="confirm-modal-title"
              aria-describedby="confirm-modal-description"
              className="flex items-end justify-center md:items-center md:p-4"
            >
              <div
                className={`relative w-full md:h-auto md:max-w-2xl bg-white rounded-t-xl md:rounded-xl transform transition-transform duration-300 ease-out ${
                  isModalOpen ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {/* Drag indicator for mobile */}
                <div className="md:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3"></div>

                {/* Main content with fixed height and scrolling */}
                <div className="flex flex-col h-[60vh] md:h-auto">
                  {/* Header - Fixed */}
                  <div className="flex justify-between items-center pb-3 lg:p-5 border-b text-center">
                    <h2 className="text-xl ml-4 font-semibold text-gray-900">
                      Confirm Your Details
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                      aria-label="Close modal"
                    >
                      <X
                        size={24}
                        className="text-gray-600 hover:text-red-600"
                      />
                    </button>
                  </div>

                  {/* Scrollable content area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="space-y-4">
                      <BaseInputField
                        name="name"
                        label="Name"
                        placeholder="Name"
                        type="text"
                        value={values.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                      />
                      <BaseInputField
                        name="email"
                        label="Email"
                        placeholder="Email"
                        type="email"
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                      <SelectNationality
                        name="nationality_id"
                        label="Nationality"
                        placeholder="Nationality"
                        value={values.nationality_id}
                        onChange={(value) =>
                          setFieldValue("nationality_id", value)
                        }
                      />
                      <div className="space-y-2">
                        <p className="text-base text-gray-600">Phone Number</p>
                        <PhoneInput
                          placeholder="Enter Your Number"
                          value={values.phone}
                          onChange={(value) => setFieldValue("phone", value)}
                          defaultCountry="EG"
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed at bottom */}
                  <div className="flex-none border-t bg-white p-6">
                    <div className="flex gap-3 max-w-full">
                      <Button
                        variant="contained"
                        onClick={() => handleConfirmBooking(values)}
                        className="flex-1 bg-blue-900 hover:bg-blue-800"
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
      {isPending && <Spinner />}
    </div>
  );
};

export default MainDataBookingForm;
