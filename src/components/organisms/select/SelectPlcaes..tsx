import useFetch from "@/hooks/UseFetch";
import SelectComp from "./SelectComp";
import { useRouter } from "next/router"; // استيراد useRouter

type SelectPlaces_tp = {
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

export default function SelectPlaces({
  name,
  label,
  labelStyle = "",
  labelProps = {},
  with_places,
  required,
  value,
  onChange,
}: SelectPlaces_tp) {
  const router = useRouter(); // استخدام useRouter للوصول للـ router

  const { data, isLoading, failureReason } = useFetch<any>({
    queryKey: ["cities"],
    endpoint: `cities`,
  });

  // تجهيز الخيارات للـ SelectComp
  const dataOptions = data?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  // التعامل مع اختيار المدينة أو إزالة الاختيار
  const handleSelectChange = (selectedOption: any) => {
    const city = selectedOption?.value;
    if (city) {
      // تحديث URL بإضافة city
      router.push({
        pathname: router.pathname,
        query: { ...router.query, city: city }, // إضافة city للـ query
      });
    } else {
      // إذا تم إلغاء التحديد، إزالة `city` من الـ URL
      const { city, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: restQuery, // تحديث الـ query بدون city
      });
    }

    // التعامل مع onChange في حالة تمريره من خارج
    if (onChange) {
      onChange(city || "");
    }
  };

  return (
    <div className="mt-2">
      <SelectComp
        placeholder={`Where`}
        name={name}
        options={dataOptions}
        selectedValue={value}
        onChange={handleSelectChange}
        isClearable // السماح بإزالة الاختيار
      />
    </div>
  );
}
