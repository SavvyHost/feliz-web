import { Form, Formik } from "formik";
import { Minus, Plus, Users, Calendar } from "lucide-react";
import { Button } from "@mui/material";

import { Spinner } from "@/components/atoms/UI/Spinner";
import DatePickerInput from "@/components/atoms/SearchExcursions/DataPickerInput";
import { notify } from "@/utils/toast";
import { useMutate } from "@/hooks/UseMutate";
import BookingModal from "./BookingModal";
import Thanks from "@/components/molecules/Thanks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const MainDataBookingForm = ({
  DetailTour,
  isDatePickerOpen = false,
  onStateChange,
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

  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, "day"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPassengers, setOpenPassengers] = useState(false);
  const [bookingStep, setBookingStep] = useState("initial");
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDetails, setPriceDetails] = useState({});
  const [ageGroupDetails, setAgeGroupDetails] = useState({});
  const [hasSetPassengers, setHasSetPassengers] = useState(false);
  const [isThanksVisible, setIsThanksVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [hasAppliedPassengers, setHasAppliedPassengers] = useState(false);

  useEffect(() => {
    if (isDatePickerOpen) {
      setIsDatePickerVisible(true);
      setBookingStep("date");
    }
  }, [isDatePickerOpen]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        selectedDate,
        hasSetPassengers,
        totalPrice,
        handleBookNowClick: () => handleBookNowClick(),
        isModalOpen,
        setIsModalOpen,
      });
    }
  }, [selectedDate, hasSetPassengers, totalPrice, isModalOpen]);

  const handleDateChange = (newDate) => {
    if (newDate && newDate.isValid()) {
      setSelectedDate(newDate);
      setIsDatePickerVisible(false);
      // Only open passengers if it hasn't been applied yet
      if (!hasAppliedPassengers) {
        setOpenPassengers(true);
        setBookingStep("passengers");
      }
    }
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

    const adultPrice = (num_of_adults * min_price).toFixed(2);
    const childrenPrice = (num_of_children * (min_price * 0.5)).toFixed(2);
    const infantsPrice = (num_of_infants * 0).toFixed(2);

    const total = (
      parseFloat(adultPrice) +
      parseFloat(childrenPrice) +
      parseFloat(infantsPrice)
    ).toFixed(2);

    setTotalPrice(total);
    setPriceDetails({
      adultPrice,
      childrenPrice,
      infantsPrice,
      total,
      discount: (discounts || 0).toFixed(2),
    });

    setAgeGroupDetails({
      adults: num_of_adults,
      children: num_of_children,
      infants: num_of_infants,
    });
  };

  const handleBookNowClick = () => {
    if (!hasSetPassengers || totalPrice === 0) {
      setIsDatePickerVisible(true);
      setBookingStep("date");
      return;
    }

    setBookingStep("details");
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

  const handlePassengersClick = () => {
    // Always toggle the passenger selection when clicked
    setOpenPassengers(!openPassengers);
  };

  return (
    <div className="relative">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-3">
            <div className="bg-white">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Select Date</h3>
              </div>
              <DatePickerInput
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                isOpen={isDatePickerVisible}
                onClose={() => {
                  setIsDatePickerVisible(false);
                  if (bookingStep === "initial" || bookingStep === "date") {
                    setBookingStep("initial");
                  }
                }}
                mobileWidth="100%"
                laptopWidth="100%"
              />
            </div>

            <div className="bg-white">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Select Passengers</h3>
              </div>
              <div
                className={`cursor-pointer bg-white border-2 ${
                  openPassengers ? "border-blue-500" : "border-gray-400"
                } p-3 rounded-lg transition-colors hover:border-blue-500`}
                onClick={handlePassengersClick}
              >
                <span className="text-gray-700">
                  {values.num_of_adults} Adults, {values.num_of_children}{" "}
                  Children, {values.num_of_infants} Infants
                </span>
              </div>

              {openPassengers && (
                <div className="mt-3 bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
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
                      className="flex justify-between items-center py-3 border-b last:border-0"
                    >
                      <div>
                        <span className="font-medium text-gray-900">
                          {label}
                        </span>
                        <div className="text-sm text-gray-500">
                          Min: {min}, Max: {max}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.max(min, values[name] - 1))
                          }
                          className="w-8 h-8 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {values[name] ?? initial}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(name, Math.min(max, values[name] + 1))
                          }
                          className="w-8 h-8 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setOpenPassengers(false);
                      calculateTotalPrice(values);
                      setHasSetPassengers(true);
                      setHasAppliedPassengers(true);
                      setBookingStep("review");
                    }}
                    type="button"
                    className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {totalPrice > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-4 border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Price Summary
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Adults ({ageGroupDetails.adults})</span>
                    <span className="font-medium">
                      ${priceDetails.adultPrice}
                    </span>
                  </div>
                  {ageGroupDetails.children > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Children ({ageGroupDetails.children})</span>
                      <span className="font-medium">
                        ${priceDetails.childrenPrice}
                      </span>
                    </div>
                  )}
                  {ageGroupDetails.infants > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Infants ({ageGroupDetails.infants})</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Free
                      </span>
                    </div>
                  )}
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${priceDetails.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!openPassengers && (
              <Button
                variant="contained"
                onClick={handleBookNowClick}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-lg font-medium rounded-lg transition-colors"
              >
                {isPending ? (
                  <Spinner size="sm" className="mr-2" />
                ) : hasSetPassengers && totalPrice > 0 ? (
                  "Book Now"
                ) : (
                  "Check Total Price"
                )}
              </Button>
            )}
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                values={values}
                setFieldValue={setFieldValue}
                onConfirm={handleConfirmBooking}
                isPending={isPending}
              />
            )}

            {isThanksVisible && (
              <Thanks
                onClose={() => setIsThanksVisible(false)}
                message="Thank you for your booking! We'll be in touch soon."
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MainDataBookingForm;
