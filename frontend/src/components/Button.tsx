import clsx from "clsx";

interface IButton {
  children: any;
  className?: string;
  disabled?: boolean;
}

export default function Button({ children, className, disabled }: IButton) {
  return (
    <>
      <button
        className={clsx(
          "px-6 py-2 font-bold drop-shadow-rift",
          disabled
            ? "cursor-not-allowed bg-rift-grey-500 text-white"
            : "cursor-pointer bg-white hover:bg-rift-grey-500",
          className
        )}
      >
        {children}
      </button>
    </>
  );
}
