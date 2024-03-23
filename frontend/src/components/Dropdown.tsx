import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface IDropdown {
  children?: any;
  className?: string;
  disabled?: boolean;
  options: string[];
}

export default function Dropdown({
  children,
  className,
  disabled,
  options,
}: IDropdown) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className={clsx(
          "flex flex-row items-center justify-between px-2 py-1 w-40 bg-white border-2 border-rift-grey-900 m-0",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <Image
          src={"/assets/window-icons/dropdown.svg"}
          width={21}
          height={21}
          alt="dropdown"
        />
      </button>
      {isOpen ? (
        <div className="flex flex-col absolute transform translate-x-[159px] top-0 z-[999]">
          {options.map((option) => (
            <button
              key={option}
              className={clsx(
                "flex flex-row items-center justify-between px-2 py-1 w-40 bg-white border-2 border-rift-grey-900 m-0",
                selectedOption === option && "bg-rift-purple-1"
              )}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
