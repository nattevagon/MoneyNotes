import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  inputMode = "text",
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
        inputMode={inputMode}
        placeholder={placeholder}
        className={"w-full bg-[#262628] text-lg text-white rounded-lg px-4 py-2 placeholder-[#939294] focus:outline-[#939294] focus:outline-2 border border-1 border-[#3d3d40]" + (errors[name] ? " text-[#e94d4d] outline-2 focus:outline-[#e94d4d] outline-[#e94d4d]" : "")}
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