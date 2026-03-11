import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

function formatRupiah(value) {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function FormCurrency({
  name,
  label,
  placeholder,
  rules = {}
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

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
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <input
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            className={"input w-full bg-[#262628] text-lg text-white rounded-lg p-4 border border-1 border-[#3d3d40]" + (errors[name] ? " text-[#e94d4d] border-[#e94d4d]" : "")}
            value={field.value ? `Rp ${formatRupiah(field.value)}` : ""}
            onChange={(e) => {
              const numeric = e.target.value.replace(/\D/g, "");
              field.onChange(numeric);
            }}
          />
        )}
      />
      {errors[name] && (
        <p className="text-[#e94d4d] text-xs mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}

FormCurrency.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string
};