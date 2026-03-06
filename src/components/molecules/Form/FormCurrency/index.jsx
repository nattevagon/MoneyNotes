import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

function formatRupiah(value) {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function FormCurrency({
  name,
  label,
  placeholder = "Masukkan jumlah uang"
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
        defaultValue=""
        render={({ field }) => (
          <input
            type="text"
            placeholder={placeholder}
            className="input w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40]"
            value={field.value ? `Rp ${formatRupiah(field.value)}` : ""}
            onChange={(e) => {
              const numeric = e.target.value.replace(/\D/g, "");
              field.onChange(numeric);
            }}
          />
        )}
      />
    </div>
  );
}

FormCurrency.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string
};