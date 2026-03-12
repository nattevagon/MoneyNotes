import { PlusIcon } from "@heroicons/react/24/solid";
import { Controller, useFormContext } from "react-hook-form";
import Select, { components } from "react-select";

const MenuList = (props) => {
  const { selectProps, children } = props;

  const handleAddItem = () => {
    const inputValue = selectProps.inputValue;
    selectProps.onAddItem(inputValue);
  };

  const isNoOption = !Array.isArray(children);

  return (
    <components.MenuList {...props}>
      {children}
      {(isNoOption && selectProps.inputValue.length > 0) && (
        <div className="p-4 border-t-1 border-[#3d3d40] mt-4">
          <button
            type="button"
            className="bg-[#065084] text-white text-xs p-2 w-full rounded-lg border border-1 border-[#3d3d40] flex items-center justify-center gap-2"
            onClick={handleAddItem}
          >
            <PlusIcon className="w-4 h-4 inline-block" />
            Add {selectProps.inputValue}
          </button>
        </div>
      )}
    </components.MenuList>
  );
};

export default function FormSelect({
  name,
  label,
  options,
  placeholder,
  onAddItem,
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
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            onChange={(val) => field.onChange(val)}
            components={{ MenuList }}
            onAddItem={onAddItem}
            maxMenuHeight={200}
            styles={{
              valueContainer: (base) => ({
                ...base,
                padding: "8px 16px"
              }),
              control: (base, state) => ({
                ...base,
                backgroundColor: "#262628",
                borderColor: "#3d3d40",
                color: "white",
                margin: 0,
                fontSize: "18px",
                borderRadius: "8px",
                boxShadow: errors[name]
                  ? "0 0 0 2px #e94d4d"
                  : state.isFocused
                    ? "0 0 0 2px #939294"
                    : "none",

                "&:hover": {
                  borderColor: errors[name] ? "#e94d4d" : "#3d3d40"
                }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#262628",
                fontSize: "18px"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#374151"
                  : state.isFocused
                    ? "#2d3748"
                    : "#262628",
                color: "white",
                fontSize: "18px",
                padding: "16px"
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
                margin: 0,
                padding: 0,
                fontSize: "18px"
              }),
              input: (base) => ({
                ...base,
                color: "white",
                margin: 0,
                padding: 0,
                fontSize: "18px"
              }),
              placeholder: (base) => ({
                ...base,
                color: "#939294",
                fontSize: "18px",
                margin: 0,
                padding: 0
              })
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