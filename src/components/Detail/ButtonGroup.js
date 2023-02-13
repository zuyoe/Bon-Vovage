import React from "react";

const ButtonGroup = ({ filters, arr, setFilter }) => {
  return (
    <div className="flex items-center justify-center">
      {arr.map((item, index) => (
        <button
          type="button"
          className={`px-5 py-2 my-3 text-xs leading-tight ${
            filters === item.title && "bg-main text-white"
          }`}
          key={index}
          onClick={() => {
            setFilter(item.title);
          }}
        >
          <div className="relative flex items-center gap-1">
            <p className="text-xs">{item.title}</p>
            <div className="text-base">{item.icon}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
