import { parseOption } from "@/utils/formatting";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IDropdown {
  children?: any;
  className?: string;
  disabled?: boolean;
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function Dropdown({
  children,
  className,
  disabled,
  options,
  value,
  setValue,
}: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={clsx(
          "flex flex-row items-center justify-between px-2 py-1 gap-x-3 bg-white border-2 border-rift-grey-900 m-0 rounded-sm",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {parseOption(value)}
        <Image
          src={"/assets/window-icons/dropdown.svg"}
          width={21}
          height={21}
          alt="dropdown"
        />
      </button>
      {isOpen ? (
        <div className="flex flex-col absolute transform translate-x-[100%] right-0 top-0 z-[999] border-2 border-rift-grey-900">
          {options.map((option, index) => (
            <button
              key={option}
              className={clsx(
                "flex flex-row items-center justify-between px-2 py-1 gap-x-3 w-full bg-white border-rift-grey-900 m-0 hover:bg-rift-grey-500 flex-nowrap",
                index === options.length - 1 ? "" : "border-b-2",
                value === option && "bg-rift-purple-1"
              )}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              {parseOption(option)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
