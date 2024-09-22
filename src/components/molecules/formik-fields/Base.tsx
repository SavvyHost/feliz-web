import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const GeneralInputClass: string = "form-input px-4 py-[.30rem] w-full";

const baseInput = tv({
  base: "!mb-0 rounded-md !border  border-1  !border-[#bbbdc8] focus:!border-1 focus:!border-[#bbbdc8] focus:outline-0 focus-shadow-none h-[41px] focus:!shadow-none",
  variants: {
    error: {
      true: "border-mainRed",
    },
    type: {
      checkbox:
        "w-4 h-4 text-main border-gray-300 rounded focus:ring-main form-checkbox shadow-none",
      radio:
        "w-5 h-5 form-radio text-main rounded-full focus:ring-main border-gray-300",
      text: GeneralInputClass,
      num: GeneralInputClass,
      email: GeneralInputClass,
      password: GeneralInputClass,
      number: GeneralInputClass,
      date: GeneralInputClass,
      time: GeneralInputClass,
      datetime: GeneralInputClass,
      month: GeneralInputClass,
      week: GeneralInputClass,
      tel: GeneralInputClass,
      url: GeneralInputClass,
      search: GeneralInputClass,
      color: GeneralInputClass,
    },
  },
});

type BaseInputVariants_TP = VariantProps<typeof baseInput>;

export interface BaseInputProps_TP
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  autocomplete?: string;
  error?: boolean;
  ref?: any;
  label?: string;
  labelDirection?: string;
}

export const BaseInput = forwardRef(
  (
    {
      error,
      label,
      labelDirection = "left",
      ...props
    }: BaseInputProps_TP & BaseInputVariants_TP,
    ref: any
  ) => {

    return (
      <div
        className={`flex flex-col ${labelDirection === "right" && "items-end"}`}
      >
        {label && (
          <label
            htmlFor={props.id}
            className={`mb-3 text-sm ${
              labelDirection === "right" 
            }`}
          >
            {label}
          </label>
        )}
        <input
          {...props}
          type={props.type || "text"}
          name={props.name}
          id={props.id}
          {...(props.placeholder ? { placeholder: props.placeholder } : {})}
          disabled={props.disabled}
          className={baseInput({
            error: error,
            className: props.className,
            type: props.type || "text",
          })}
          autoComplete={"off"}
          placeholder={props?.placeholder}
          value={props.value}
          ref={ref}
        />
      </div>
    );
  }
);
