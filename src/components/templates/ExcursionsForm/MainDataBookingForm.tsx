import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Minus, Plus } from "lucide-react";
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
import "react-toastify/dist/ReactToastify.css";

const MainDataBookingForm = ({ DetailTour, setIsThanksVisible }) => {
  const { mutate, isPending } = useMutate({
    mutationKey: ["bookings"],
    endpoint: `bookings`,
    onSuccess: () => {
      setIsThanksVisible(true);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPassengers, setOpenPassengers] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
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

  const handleOpenModal = (values) => {
    if (!selectedDate) {
      setShowValidationAlert(true);
      notify("error", "Please select a date and Passengers before proceeding."); // Show notification
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
    setIsModalOpen(false);
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
                      min: 2,
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
                          className="p-2 bg-gray-100 text-green-600 rounded-full flex items-center justify-center focus:outline-none hover:bg-green-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{values[name] ?? initial}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.min(max, values[name] + 1))
                          }
                          className="p-2 bg-gray-100 text-green-600 rounded-full flex items-center justify-center focus:outline-none hover:bg-green-200 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <button
                      onClick={() => setOpenPassengers(false)}
                      type="button"
                      className="w-full p-3 bg-green-700 text-white rounded-md hover:bg-green-900 transition duration-150"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="contained"
              onClick={() => handleOpenModal(values)}
              className="mt-4 w-full bg-green-900 hover:bg-green-600"
            >
              Book Now
            </Button>

            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="confirm-modal-title"
              aria-describedby="confirm-modal-description"
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-md shadow-md w-80">
                  <h2
                    id="confirm-modal-title"
                    className="text-lg font-medium mb-2"
                  >
                    Confirm Your Details
                  </h2>
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
                    onChange={(value) => setFieldValue("nationality_id", value)}
                  />
                  <div className="relative my-2">
                    <p className="mb-2 text-base text-gray-600">Number</p>
                    <PhoneInput
                      placeholder="Enter Your Number"
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value)}
                      defaultCountry="EG"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outlined"
                      className="border border-green-600 text-green-800 hover:bg-none"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleConfirmBooking(values)}
                      className="ml-2 bg-green-900 hover:bg-green-600"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
      {isPending && <Spinner />}
      <ToastContainer />
    </div>
  );
};

export default MainDataBookingForm;
