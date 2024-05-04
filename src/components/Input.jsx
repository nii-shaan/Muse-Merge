import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full h-[50px] text-white flex items-start justify-start py-5 mb-2 mt-5 rounded-lg">
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        className={` ${className} text-center rounded-lg  h-7 ml-2 text-black `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
