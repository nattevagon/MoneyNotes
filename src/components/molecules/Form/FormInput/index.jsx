import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  rules
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

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
        className={"input input-bordered w-full bg-[#262628] text-lg text-white rounded-lg p-4 border border-1 border-[#3d3d40]" + (errors[name] ? " text-[#e94d4d] border-[#e94d4d]" : "")}
        {...register(name, rules)}
      />
      {errors[name] && (
        <p className="text-[#e94d4d] text-xs mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}

export default FormInput