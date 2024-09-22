import { Label } from "@/components/atoms/Label";
import { useFormikContext } from "formik";
import React, { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BaseInput } from "./Base";
import { FormikError } from "@/components/atoms/FormikError";

interface BaseInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  required?: boolean;
  labelStyle?: string;
  Style?: string;
  setImgUpload?: (file: File | null) => void;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  name: string;
  type: "text" | "password" | "email" | "num";
  maxNum?: string;
}

const BaseInputField: React.FC<BaseInputFieldProps> = ({
  label,
  id,
  required = false,
  labelStyle = "",
  Style = "",
  labelProps = {},
  name,
  placeholder = "",
  type = "text",
  setImgUpload,
  disabled,
  maxNum,
  ...props
}) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{ [key: string]: any }>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };
  const handleChangeNumber = (e: any) => {
    let value = e.target.value;
    if (type == "num") {
      const numericRegex = /^[0-9]+$/;
      if (!numericRegex.test(value)) {
        setFieldValue(name, "");
        return;
      }
    }
    if (maxNum && value.length > maxNum) {
      value = value.slice(0, maxNum);
    }
    setFieldValue(name, value);
  };
  const handleBlur = () => setFieldTouched(name, true);

  return (
    <>
      <div className={`rtl:text-right mt-2 ${Style}`}>
        {label && (
          <Label
            htmlFor={id}
            {...labelProps}
            required={required}
            className={`mb-3 text-sm ${labelStyle}`}
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <div className="relative">
            <BaseInput
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              id={id}
              {...props}
              value={values[name]}
              error={touched[name] && !!errors[name]}
              autoComplete="off"
              disabled={disabled}
              onBlur={handleBlur}
              placeholder={placeholder}
              onChange={type == "num" ? handleChangeNumber : handleChange}
            />
            {type === "password" && (
              <div className="absolute inset-y-0 rtl:left-[10px] ltr:right-[0] top-[-0px] pr-3 flex items-center text-xl text-green leading-5">
                <button onClick={togglePasswordVisibility} type="button">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}
          </div>
        </div>
        <FormikError name={name as string} />
      </div>
    </>
  );
};

export default BaseInputField;
