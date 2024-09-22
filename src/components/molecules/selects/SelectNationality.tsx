import { useFormikContext } from "formik";
import { SelectComp } from "../formik-fields/Select";
import { Label } from "@/components/atoms/Label";
import useFetch from "@/hooks/UseFetch";

type SelectNationality_tp = {
  name: string;
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelStyle?: string;
  required?: boolean;
};

export default function SelectNationality({
  name,
  label,
  labelStyle = "",
  labelProps = {},
  required,
  placeholder,
}: SelectNationality_tp) {
  const { values, setFieldValue } = useFormikContext<any>();
  const { data, isLoading, failureReason } = useFetch<any>({
    queryKey: ["nationalities"],
    endpoint: `nationalities`,
  });

  const dataOptions = data?.data?.map((item: any) => ({
    value: item.id,
    label: item.nationality,
  }));


  const selectedMonth = dataOptions?.find(
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
        options={dataOptions}
        onChange={(option: any) => setFieldValue(name, option?.value)}
      />
    </div>
  );
}
