const FormNavigation = ({ children, className }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0">
      <div className={"bg-[#262628] text-white px-6 pt-6 pb-8 shadow-lg border-t-1 border-[#3d3d40]" + (className ? " " + className : "")}>
        {children}
      </div>
    </nav>
  )
}

export default FormNavigation;