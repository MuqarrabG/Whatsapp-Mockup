//Foreign Code credit the author required
//https://github.com/hiteshchoudhary/apihub

import React from "react";

// Utility function to concatenate class names
const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

const Input = (props) => {
  return (
    <input
      {...props}
      className={classNames(
        "block w-full rounded-xl outline outline-[1px] outline-zinc-400 border-0 py-4 px-5 bg-secondary text-white font-light placeholder:text-white/70",
        props.className || ""
      )}
    />
  );
};

export default Input;
