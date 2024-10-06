import React, { useState } from "react";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectMonth from "@/components/molecules/selects/SelectMonth";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import { Form, Formik } from "formik";
import {
  Minus,
  Plus,
  User,
  Mail,
  Globe,
  Calendar,
  Phone,
  LocateFixedIcon,
  MapPin,
  CalendarClock,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import Dropdown from "./Dropdown";
import { useMutate } from "@/hooks/UseMutate";
import DatePickerModal from "@/components/molecules/dataPicker";
import dayjs from "dayjs";
import { Spinner } from "../UI/Spinner";
import { notify } from "@/utils/toast";
import { FaCity, FaEnvelope, FaUser } from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
import { LocationCity } from "@mui/icons-material";

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
    fornoneata: true,
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeDays, setRangeDays] = useState(1);

  const handleDateChange = (date, days) => {
    setSelectedDate(date ? dayjs(date) : null);
    setRangeDays(days);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
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
            <div className="grid grid-cols-1 gap-4 mb-4">
              <Dropdown
                items={[]}
                selectedItem={DetailTour?.destination}
                onSelect={() => {}}
                placeholder="Where"
                isDropdownOpen={false}
                setIsDropdownOpen={() => {}}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <BaseInputField
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="block w-full pl-10 bg-[#f0f1f2] focus:bg-transparent text-black text-sm border outline-[#007bff] rounded transition-all"
                />
                <div className="absolute left-3 top-5 text-gray-400">
                  <FaEnvelope size={16} />
                </div>
              </div>

              <div className="relative">
                <BaseInputField
                  name="name"
                  placeholder="Name"
                  type="text"
                  className="block w-full pl-10 bg-[#f0f1f2] focus:bg-transparent text-black text-sm border outline-[#007bff] rounded transition-all"
                />
                <div className="absolute left-3 top-5 text-gray-400">
                  <FaUser size={16} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <SelectNationality
                  name="nationality_id"
                  placeholder="Nationality"
                />
                <div className="absolute left-3 top-5 text-gray-400">
                  <MapPin size={16} />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <PhoneInput
                  placeholder="Enter Your Number"
                  value={values.phone}
                  onChange={(value) => setFieldValue("phone", value)}
                  defaultCountry="EG"
                  className="block w-full my-3 mt-2 pb-3 p-2 bg-[#f0f1f2] focus:bg-transparent text-black text-sm border outline-[#007bff] rounded transition-all"
                  inputStyle={{
                    textAlign: "center", // Centering text inside the input
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col ">
                <div className="relative">
                  <SelectMonth name="month" placeholder="Select Month" />
                  <div className="absolute left-3 top-5 text-gray-400">
                    <Calendar size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(true)}
                  className="block w-full pl-3 pr-3 py-[8px] justify-start items-center text-gray-400 text-left bg-[#f0f1f2] focus:bg-transparent text-black text-sm border outline-[#007bff] rounded transition-all"
                >
                  {selectedDate ? (
                    <span className="block text-gray-700">
                      {`${selectedDate.format("YYYY-MM-DD")} to ${selectedDate
                        .add(rangeDays - 1, "day")
                        .format("YYYY-MM-DD")}`}
                    </span>
                  ) : (
                    <span className="flex gap-x-4 text-gray-500">
                      <CalendarClock /> select date
                    </span>
                  )}
                </button>
              </div>
            </div>
            <DatePickerModal
              open={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onDateChange={handleDateChange}
              setFieldValue={setFieldValue}
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Adults", name: "num_of_adults" },
                { label: "Children", name: "num_of_children" },
                { label: "Infants", name: "num_of_infants" },
              ].map(({ label, name }) => (
                <div
                  key={label}
                  className="flex flex-col text-center p-1 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-[#007bff] rounded transition-all"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="flex items-center justify-between  rounded-lg shadow-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(name, Math.max(0, values[name] - 1))
                      }
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-center min-w-[2rem]">
                      {values[name]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFieldValue(name, values[name] + 1)}
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Tell us More Details"
                className="w-full p-3 bg-[#f0f1f2] focus:bg-transparent text-black text-sm border outline-[#007bff] rounded transition-all"
                rows={4}
              ></textarea>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150"
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
