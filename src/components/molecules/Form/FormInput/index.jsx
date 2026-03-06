import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text", placeholder }) => {
  const { register } = useFormContext();

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full bg-[#262628] text-white rounded-lg p-4 border border-1 border-[#3d3d40]"
        {...register(name)}
      />
    </div>
  );
}

export default FormInput