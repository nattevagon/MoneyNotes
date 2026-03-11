const Button = ({
  children,
  className = "",
  category,
  type = "button",
  onClick
}) => {
  const baseClass =
    "w-full rounded-lg p-4 text-white border border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center";

  const categoryClass = {
    primary: "bg-[#065084]",
    secondary: "bg-[#262628]"
  };

  const classes = `${baseClass} ${categoryClass[category] || ""} ${className}`;

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;