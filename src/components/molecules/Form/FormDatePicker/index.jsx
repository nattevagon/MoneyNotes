import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormDatePicker({
  name,
  label,
  placeholder = "Pilih tanggal"
}) {
  const { control } = useFormContext();

  return (
    <div className="form-control w-full flex flex-col">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            placeholderText={placeholder}
            dateFormat="dd/MM/yyyy"
            className="w-full bg-[#262628] text-lg text-white rounded-lg px-4 py-2 placeholder-[#939294] focus:outline-[#939294] focus:outline-2 border border-1 border-[#3d3d40]"
          />
        )}
      />
    </div>
  );
}