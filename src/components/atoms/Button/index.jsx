import React from 'react'

const Button = ({ children, className, category, type, onClick }) => {
  let baseClassName = "w-full rounded-lg p-4 text-white border border-1 border-[#3d3d40] hover:bg-[#44444E] transition-colors cursor-pointer text-center" + (className ? " " + className : "");

  if (category === 'primary') {
    baseClassName = baseClassName + " bg-[#065084]";
  } else if (category === 'secondary') {
    baseClassName = baseClassName + " bg-[#262628]";
  }

  return (
    type === 'submit' ?
      <button className={baseClassName} type="submit">
        {children}
      </button>
      :
      <button className={baseClassName} onClick={onClick}>
        {children}
      </button>
  )
}

export default Button;