import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function FormSelect({
  name,
  label,
  options,
  placeholder
}) {
  const { control } = useFormContext();

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            onChange={(val) => field.onChange(val)}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#262628",
                borderColor: state.isFocused ? "#3d3d40" : "#374151",
                size: "12px",
                color: "white"
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1f2937"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#374151"
                  : state.isFocused
                    ? "#2d3748"
                    : "#1f2937",
                color: "white"
              }),
              singleValue: (base) => ({
                ...base,
                size: "12px",
                color: "white"
              }),
              input: (base) => ({
                ...base,
                size: "12px",
                color: "white"
              }),
              placeholder: (base) => ({
                ...base,
                size: "12px",
                color: "#9ca3af"
              })
            }}
          />
        )}
      />
    </div>
  );
}