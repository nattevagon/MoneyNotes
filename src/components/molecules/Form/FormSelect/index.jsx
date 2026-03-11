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
              control: (base, state) => ({
                ...base,
                backgroundColor: "#262628",
                borderColor: state.isFocused ? "#3d3d40" : errors[name] ? "#e94d4d" : "#374151",
                color: "white",
                fontSize: "14px",
                borderRadius: "8px"
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#262628",
                fontSize: "14px"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#374151"
                  : state.isFocused
                    ? "#2d3748"
                    : "#262628",
                color: "white",
                fontSize: "14px"
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
                fontSize: "14px"
              }),
              input: (base) => ({
                ...base,
                color: "white",
                fontSize: "14px"
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9ca3af",
                fontSize: "14px"
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