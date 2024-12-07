import React from "react";
import { X } from "lucide-react";
import { Modal } from "@mui/material";
import { Spinner } from "@/components/atoms/UI/Spinner";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  values: any;
  setFieldValue: (field: string, value: any) => void;
  onConfirm: (values: any) => void;
  isPending: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  values,
  setFieldValue,
  onConfirm,
  isPending,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-end justify-center md:items-center md:p-4"
    >
      <div className="relative w-full md:max-w-2xl bg-white rounded-t-xl md:rounded-xl shadow-xl">
        <div className="md:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        <div className="flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Complete Your Booking
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <BaseInputField
              name="name"
              label="Full Name"
              placeholder=""
              type="text"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            />
            <BaseInputField
              name="email"
              label="Email Address"
              placeholder=""
              type="email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
            />
            <SelectNationality
              name="nationality_id"
              label="Nationality"
              placeholder=""
              value={values.nationality_id}
              onChange={(value) => setFieldValue("nationality_id", value)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                international
                placeholder=""
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)}
                defaultCountry="EG"
                className="w-full p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="border-t bg-gray-50 p-6">
            <button
              onClick={() => onConfirm(values)}
              disabled={isPending}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              {isPending ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
