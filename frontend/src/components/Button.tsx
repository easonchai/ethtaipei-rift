import clsx from "clsx";

interface IButton {
  children: any;
  className?: string;
  disabled?: boolean;
  onClick?: any;
}

export default function Button({
  children,
  className,
  disabled,
  onClick,
}: IButton) {
  return (
    <>
      <button
        className={clsx(
          "px-6 py-2 font-bold drop-shadow-rift transform active:drop-shadow-none active:translate-x-1 active:translate-y-1",
          disabled
            ? "cursor-not-allowed bg-rift-grey-500 text-white drop-shadow-rift-disabled"
            : "cursor-pointer bg-white",
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
