import { useFormikContext } from "formik";
import { SelectComp } from "../formik-fields/Select";
import { Label } from "@/components/atoms/Label";

type SelectMonth_tp = {
  name: string;
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelStyle?: string;
  required?: boolean;
};

export default function SelectMonth({
  name,
  label,
  labelStyle = "",
  labelProps = {},
  required,
  placeholder,
}: SelectMonth_tp) {
  const { values, setFieldValue } = useFormikContext<any>();

  const monthsOptions: any[] = [
    { label: "January", value: "Jan" },
    { label: "February", value: "Feb" },
    { label: "March", value: "Mar" },
    { label: "April", value: "Apr" },
    { label: "May", value: "May" },
    { label: "June", value: "Jun" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const selectedMonth = monthsOptions.find(
    (option: any) => option?.value === values[name]
  );

  return (
    <div className="mt-2">
      {label && (
        <Label
          htmlFor=""
          {...labelProps}
          required={required}
          className={`mb-3 text-sm ${labelStyle}`}
        >
          {label}
        </Label>
      )}
      <SelectComp
        placeholder={placeholder}
        id="optionStatus"
        name={name}
        value={selectedMonth}
        isDisabled={false}
        loading={false}
        options={monthsOptions}
        onChange={(option: any) => setFieldValue(name, option?.value)}
      />
    </div>
  );
}
