"use client";

import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

const Select: React.FC<{
  options: string[];
  setOptions: (values: string[]) => void;
}> = ({ options, setOptions }) => {
  const optionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const handleAddNewItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newOptions = [inputValue, ...options];
      setOptions(newOptions);
      setInputValue("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      )
        setOpenSelect(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={optionRef}>
      <div
        className={`select ${openSelect ? "open" : ""}`}
        onClick={() => setOpenSelect((prev) => !prev)}
      >
        {selected.join(", ") || "choose an item"}
      </div>
      <div className={`option-container ${openSelect ? "open" : ""}`}>
        <div className="options-wrapper">
          {options.map((option) => (
            <div
              key={option}
              className={`option ${selected.includes(option) ? "active" : ""}`}
              onClick={() => {
                const newSelected = selected.includes(option)
                  ? selected.filter((item) => item !== option)
                  : [...selected, option];

                setSelected(newSelected);
              }}
            >
              {option}
            </div>
          ))}
        </div>

        <form onSubmit={handleAddNewItem}>
          <input
            placeholder="Enter new item"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Select;
