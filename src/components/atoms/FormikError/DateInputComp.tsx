import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormikContext } from "formik";

function DateInputComp({ name, countDays }) {
  const today = dayjs();
  const daysAfter = countDays;
  const futureDate = today.add(daysAfter, "day");
  const { values, setFieldValue } = useFormikContext();
  console.log("🚀 ~ DateInputComp ~ values:", values)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DatePicker
          defaultValue={today}
          minDate={today}
          maxDate={futureDate}
          disablePast
          name={name}
          views={["year", "month", "day"]}
          onChange={(date) => {
            const formattedDate = dayjs(date).format("YYYY-MM-DD");
            setFieldValue(name, formattedDate);
          }}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}

export default DateInputComp;
