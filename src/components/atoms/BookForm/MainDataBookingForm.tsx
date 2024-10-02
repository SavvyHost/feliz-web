import React, { useState } from "react";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectMonth from "@/components/molecules/selects/SelectMonth";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import { Form, Formik } from "formik";
import { Minus, Plus } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import Dropdown from "./Dropdown";
import { useMutate } from "@/hooks/UseMutate";
import DatePickerModal from "@/components/molecules/dataPicker"; // Adjust the path accordingly
import { Input } from "@mui/material"; // Import Input component
import dayjs, { Dayjs } from "dayjs"; // Make sure to import Dayjs correctly
import { Spinner } from "../UI/Spinner";
import { notify } from "@/utils/toast";

function MainDataBookingForm({ DetailTour, setIsThanksVisible }) {
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

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Ensure this is initialized as null or Dayjs
  const [rangeDays, setRangeDays] = useState(1);

  const handleDateChange = (date: Dayjs | null, days: number) => {
    setSelectedDate(date ? dayjs(date) : null);
    setRangeDays(days);
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          nationality_id: "",
          month: "",
          phone: "",
          start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
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
            start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
          })
        }
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Dropdown
              items={[]}
              selectedItem={DetailTour?.destination}
              onSelect={() => {}}
              placeholder="Where"
              isDropdownOpen={false}
              setIsDropdownOpen={() => {}}
            />
            <div className="mb-2">
              <BaseInputField name="name" placeholder="Name" type="text" />
            </div>
            <div className="mb-2">
              <BaseInputField name="email" placeholder="Email" type="email" />
            </div>
            <div className="my-2">
              <SelectNationality
                name="nationality_id"
                placeholder="Select Nationality"
              />
            </div>
            <SelectMonth name="month" placeholder="Select Month" />

            <div className="relative flex items-center mt-2">
              <PhoneInput
                placeholder="Enter Your Number"
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)}
                defaultCountry="EG"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="my-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Start Date"
                  value={
                    selectedDate
                      ? `${selectedDate.format("YYYY-MM-DD")} to ${selectedDate
                          .add(rangeDays - 1, "day")
                          .format("YYYY-MM-DD")}`
                      : "Select a date range"
                  }
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* DatePickerModal Integration */}
            <DatePickerModal
              open={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onDateChange={handleDateChange}
              setFieldValue={setFieldValue}
            />

            <div className="space-y-4 mt-3 mb-2">
              {[
                { label: "Adults", name: "num_of_adults" },
                { label: "Children", name: "num_of_children" },
                { label: "Infants", name: "num_of_infants" },
              ].map(({ label, name }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-700">{`Number of ${label}`}</span>
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
            </div>

            {/* Additional Details */}
            <textarea
              placeholder="Tell us More Details"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
            ></textarea>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-150"
              >
                {isPending ? <Spinner /> : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MainDataBookingForm;
