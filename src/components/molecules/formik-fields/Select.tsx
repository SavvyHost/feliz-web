import { FormikError } from "@/components/atoms/FormikError";
import { Label } from "@/components/atoms/Label";
import { Spinner } from "@/components/atoms/UI/Spinner";
import { SelectOption_TP } from "@/types/tour";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  Theme,
} from "react-select";
import makeAnimated from "react-select/animated";


type Select_TP = {
  value?:
    | SingleValue<SelectOption_TP>
    | MultiValue<SelectOption_TP>
    | undefined;
  label?: string;
  name?: string;
  modalTitle?: string;
  id: string;
  isMulti?: boolean;
  required?: boolean;
  placeholder?: string;
  loadingPlaceholder?: string;
  options: SelectOption_TP[] | undefined;
  loading?: boolean;
  onChange?: (
    option: SingleValue<SelectOption_TP> | MultiValue<SelectOption_TP>
  ) => void | undefined;
  creatable?: boolean;
  formatCreateLabel?: (inputValue: string) => string;
  fieldKey?: "id" | "value";
  isClearable?: boolean;
  isDisabled?: boolean;
  onSimpleCreate?: (inputValue: string) => void;
  onComplexCreate?: (inputValue: string) => void;
  CreateComponent?: ({
    value,
    onAdd,
    setSelectOptions,
  }: {
    value: string;
    onAdd: (value: string) => void;
    setSelectOptions?: (options: any[]) => void;
  }) => JSX.Element;
  setOptions?: (options: any[]) => void;
  defaultValue?: SelectOption_TP;
};

export const selectTheme = (theme: Theme) => ({
  ...theme,
  borderRadius: 5,
  colors: {
    ...theme.colors,
    neutral80: "#295E56",
    primary25: "#e9eeed",
    primary: "#1BC5BD",
  },
});

export const selectClassNames = (touched: boolean, error: boolean) => ({
  control: ({ menuIsOpen }: { menuIsOpen: boolean }) =>
    `border-style !rounded-md !shadow-none !shadow-md !border-1 date-range-lib h-[41px] ${
      touched && error ? " !border-mainRed" : ""
    } ${menuIsOpen && "!border-[rgba(0, 29, 110, 0.4)]"}`,
  dropdownIndicator: () => `!text-main`,
  valueContainer: () => `!overflow-x-auto !overflow-y-hidden scrollbar`,
});

export const SelectComp = ({
  label,
  name,
  id,
  isMulti,
  required,
  placeholder,
  loadingPlaceholder,
  options,
  loading,
  onChange,
  isDisabled,
  creatable = false,
  formatCreateLabel,
  fieldKey = "value",
  onSimpleCreate,
  CreateComponent,
  onComplexCreate,
  setOptions,
  modalTitle,
  defaultValue,
  isClearable=true,
  ...props
}: Select_TP) => {
  const animatedComponents = makeAnimated();
  const { setFieldValue, errors, touched, handleBlur } = useFormikContext<{
    [key: string]: any;
  }>();
  const customNoOptionsMessage = () => ("No options");

  const selectProps = {
    ...props,
    components: {
      ...animatedComponents,
      LoadingIndicator: () => <Spinner className="ml-2" size="medium" />,
    },
    id: id,
    defaultValue,
    name,
    isMulti,
    required,
    placeholder: loading ? loadingPlaceholder : placeholder,
    options,
    isClearable,
    isLoading: loading && !isDisabled,
    isDisabled: loading || isDisabled,
    classNames: selectClassNames(
      !!touched[name as string],
      !!errors[name as string]
    ),
    theme: selectTheme,
    onBlur: handleBlur(name) as (e: ChangeEvent) => void,
    onChange: (
      option: SingleValue<SelectOption_TP> | MultiValue<SelectOption_TP>,
      actionMeta: ActionMeta<SelectOption_TP>
    ) => {
      setFieldValue(
        name as string,
        isMulti
        ? (option as MultiValue<SelectOption_TP>)?.map((opt) => opt[fieldKey]) || []
        : (option as SelectOption_TP)?.[fieldKey] || null,
        true
      );
      onChange?.(option);
    },
  };

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-1">
          {label && (
            <Label htmlFor={id} className="mb-3 text-sm" required={required}>
              {label}
            </Label>
          )}

          <Select {...selectProps} noOptionsMessage={customNoOptionsMessage} />
        </div>
        <FormikError name={name as string} />
      </div>
    </>
  );
};


