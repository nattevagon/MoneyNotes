import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: ""
  });

  const showToast = useCallback((message) => {
    setToast({
      show: true,
      message
    });
  }, []);

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <GlobalToast toast={toast} hideToast={hideToast} />
    </ToastContext.Provider>
  );
}

function GlobalToast({ toast, hideToast }) {
  const { show, message } = toast;

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-[120px] z-[999] transition-all duration-300
      ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
    >
      <ToastContent message={message} hideToast={hideToast} show={show} />
    </div>
  );
}

function ToastContent({ message, hideToast, show }) {
  if (!show) return null;

  setTimeout(() => {
    hideToast();
  }, 3000);

  return (
    <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
}