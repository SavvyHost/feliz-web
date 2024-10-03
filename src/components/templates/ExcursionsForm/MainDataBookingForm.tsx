import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Minus, Plus } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { Modal, Button } from "@mui/material";

import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import { useMutate } from "@/hooks/UseMutate";
import { Spinner } from "../../atoms/UI/Spinner";
import { notify } from "@/utils/toast";
import DatePickerInput from "@/components/atoms/SearchExcursions/DataPickerInput";

interface MainDataBookingFormProps {
  DetailTour: { id: number };
  setIsThanksVisible: (visible: boolean) => void;
}

const MainDataBookingForm: React.FC<MainDataBookingFormProps> = ({
  DetailTour,
  setIsThanksVisible,
}) => {
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

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const initialValues = {
    name: "",
    email: "",
    nationality_id: "",
    phone: "",
    start_at: "",
    num_of_adults: 1,
    num_of_children: 0,
    num_of_infants: 0,
    tour_id: DetailTour?.id,
    duration: "1",
    phone_code: "+20",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setIsModalOpen(true);
    setSubmitting(false);
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form>
            <DatePickerInput
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              mobileWidth="100%"
              laptopWidth="100%"
              height="40px"
              labelProps={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.6)",
                transform: "translate(14px, 12px) scale(1)",
              }}
            />

            <div className="mt-4 relative">
              <Button
                variant="outlined"
                className="bg-green-600 text-white border-green-950 hover:bg-green-800 w-full"
                onClick={() => setOpenPassengers(!openPassengers)}
              >
                {`Adults: ${values.num_of_adults}, Children: ${values.num_of_children}, Infants: ${values.num_of_infants}`}
              </Button>

              {openPassengers && (
                <div
                  className="absolute top-full left-0 right-0 z-10 bg-white p-4 rounded-md shadow-md mt-2"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {[
                    { label: "Adults", name: "num_of_adults" },
                    { label: "Children", name: "num_of_children" },
                    { label: "Infants", name: "num_of_infants" },
                  ].map(({ label, name }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center mb-4"
                    >
                      <span>{label}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.max(0, values[name] - 1))
                          }
                          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{values[name]}</span>
                        <button
                          type="button"
                          onClick={() => setFieldValue(name, values[name] + 1)}
                          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition duration-150"
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
              color="primary"
              onClick={() => setIsModalOpen(true)}
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
                      color="primary"
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
    </div>
  );
};

export default MainDataBookingForm;
