import React, { useState } from "react";
import { Button, Modal, Slide, IconButton, Input } from "@mui/material";
import { Form, Formik } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Plus, Minus, X } from "lucide-react";
import dayjs from "dayjs";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import Dropdown from "./Dropdown";
import DatePickerModal from "@/components/molecules/dataPicker";
import { useMutate } from "@/hooks/UseMutate";
import { notify } from "@/utils/toast";
import { Spinner } from "../UI/Spinner";
import Thanks from "@/components/molecules/Thanks";
import SelectMonth from "@/components/molecules/selects/SelectMonth";

export default function BookingFormModal({ DetailTour }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeDays, setRangeDays] = useState(1);
  const [showThanks, setShowThanks] = useState(false);

  const { mutate, isPending } = useMutate({
    mutationKey: ["bookings"],
    endpoint: `bookings`,
    onSuccess: () => {
      setIsModalOpen(false); // Close the form modal after success
      setShowThanks(true); // Show the Thanks modal
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    formData: true,
  });

  const handleDateChange = (date, days) => {
    setSelectedDate(date ? dayjs(date) : null);
    setRangeDays(days);
  };

  return (
    <>
      <Button
        className="py-2 capitalize w-full bg-green-700 text-white rounded-none hover:bg-green-500 transition duration-300 font-segoe fixed top-[68px] right-0 z-30 md:hidden"
        onClick={() => setIsModalOpen(true)}
      >
        Open Booking Form
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex w-full h-full"
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
          <div className="relative w-full h-full bg-white overflow-y-auto">
            {/* Fixed X Icon at the top */}
            <div className="fixed top-0 left-0 right-0  bg-white z-50 p-4">
              <h2 className="text-xl font-bold text-gray-800">
                US ${DetailTour?.min_price} / Per person
              </h2>
              <IconButton
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2"
              >
                <X />
              </IconButton>
              <h2 className="text-2xl font-bold mb-4"></h2>
            </div>

            <div className="pt-[80px] p-4 pb-[80px]">
              {" "}
              {/* Adjust the padding for space */}
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  nationality_id: "",
                  month: "",
                  phone: "",
                  start_at: selectedDate
                    ? selectedDate.format("YYYY-MM-DD")
                    : "",
                  num_of_adults: 1,
                  num_of_children: 0,
                  num_of_infants: 0,
                  tour_id: DetailTour?.id,
                  duration: "",
                  phone_code: "+20",
                }}
                onSubmit={(values) =>
                  mutate({
                    ...values,
                    phone: values?.phone.slice(2),
                    start_at: selectedDate
                      ? selectedDate.format("YYYY-MM-DD")
                      : "",
                  })
                }
              >
                {({ setFieldValue, values }) => (
                  <Form className="space-y-4">
                    {/* Other form fields */}
                    <Dropdown
                      items={[]}
                      selectedItem={DetailTour?.destination}
                      onSelect={() => {}}
                      placeholder="Where"
                      isDropdownOpen={false}
                      setIsDropdownOpen={() => {}}
                    />

                    <BaseInputField
                      name="name"
                      placeholder="Name"
                      type="text"
                    />
                    <BaseInputField
                      name="email"
                      placeholder="Email"
                      type="email"
                    />

                    <SelectNationality
                      name="nationality_id"
                      placeholder="Select Nationality"
                    />

                    <SelectMonth name="month" placeholder="Select Month" />

                    <div className="relative">
                      <PhoneInput
                        placeholder="Enter Your Number"
                        value={values.phone}
                        onChange={(value) => setFieldValue("phone", value)}
                        defaultCountry="EG"
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Start Date"
                        value={
                          selectedDate
                            ? `${selectedDate.format(
                                "YYYY-MM-DD"
                              )} to ${selectedDate
                                .add(rangeDays - 1, "day")
                                .format("YYYY-MM-DD")}`
                            : "Select a date range"
                        }
                        onClick={() => setIsDatePickerModalOpen(true)}
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <DatePickerModal
                      open={isDatePickerModalOpen}
                      onClose={() => setIsDatePickerModalOpen(false)}
                      onDateChange={handleDateChange}
                      setFieldValue={setFieldValue}
                    />

                    {["Adults", "Children", "Infants"].map((type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center"
                      >
                        <span>{`Number of ${type}`}</span>
                        <div className="flex items-center space-x-2">
                          <IconButton
                            onClick={() =>
                              setFieldValue(
                                `num_of_${type.toLowerCase()}`,
                                Math.max(
                                  0,
                                  values[`num_of_${type.toLowerCase()}`] - 1
                                )
                              )
                            }
                          >
                            <Minus size={16} />
                          </IconButton>
                          <span>{values[`num_of_${type.toLowerCase()}`]}</span>
                          <IconButton
                            onClick={() =>
                              setFieldValue(
                                `num_of_${type.toLowerCase()}`,
                                values[`num_of_${type.toLowerCase()}`] + 1
                              )
                            }
                          >
                            <Plus size={16} />
                          </IconButton>
                        </div>
                      </div>
                    ))}

                    <textarea
                      placeholder="Tell us More Details"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={4}
                    ></textarea>

                    {/* Fixed Submit Button */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white z-50">
                      <Button
                        type="submit"
                        className="w-full p-3 bg-green-950 text-white rounded-md hover:bg-green-700 transition duration-150"
                      >
                        {isPending ? <Spinner /> : "Submit"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Slide>
      </Modal>

      {showThanks && (
        <Modal
          open={showThanks}
          onClose={() => setShowThanks(false)}
          className="flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-lg">
            <Thanks
              onClose={() => setShowThanks(false)}
              message="Thank you for your submission!"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
