import SelectComp from "./SelectComp";
import { useRouter } from "next/router"; // استيراد useRouter

// تعريف نوع OptionType
type OptionType = {
  label: string;
  value: string;
};

type SelectMonth_tp = {
  name: string;
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelStyle?: string;
  required?: boolean;
  with_places?: boolean;
  onChange?: (value: string) => void;
  value?: string;
};

export default function SelectMonth({
  name,
  label,
  labelStyle = "",
  labelProps = {},
  with_places,
  required,
  value,
  onChange,
}: SelectMonth_tp) {
  const router = useRouter();

  // بيانات الشهور الثابتة
  const monthsOptions: OptionType[] = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  // التعامل مع اختيار الشهر أو إزالة الاختيار
  const handleSelectChange = (selectedOption: any) => {
    const month = selectedOption?.value;
    if (month) {
      // تحديث URL بإضافة month
      router.push({
        pathname: router.pathname,
        query: { ...router.query, month }, // إضافة month للـ query
      });
    } else {
      // إذا تم إلغاء التحديد، إزالة `month` من الـ URL
      const { month, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: restQuery, // تحديث الـ query بدون month
      });
    }

    // التعامل مع onChange في حالة تمريره من خارج
    if (onChange) {
      onChange(month || "");
    }
  };

  return (
    <div className="mt-2">
      <SelectComp
        placeholder={`Select a month`}
        name={name}
        options={monthsOptions}
        selectedValue={value}
        onChange={handleSelectChange}
        isClearable // السماح بإزالة الاختيار
      />
    </div>
  );
}
