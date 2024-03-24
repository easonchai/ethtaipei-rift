import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Snake = dynamic(() => import("@/components/Snake"), {
  ssr: false,
});

interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: any;
  className?: string;
  time?: number;
  done?: boolean;
  link?: string;
}

function Modal({
  isOpen,
  setIsOpen,
  children,
  className,
  time,
  done,
  link,
}: IModal) {
  const [remainingTime, setRemainingTime] = useState(time);

  const parseNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    if (remainingTime) {
      let interval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-rift-grey-900">
        {/* The actual dialog panel  */}
        <Dialog.Panel>
          <div className="border-2 border-rift-grey-900 flex-1 flex flex-col max-w-[572px]">
            <div className="h-8 w-full flex flex-row px-5 py-2 justify-end gap-x-4 bg-rift-blue-2 border-b-2 border-rift-grey-900">
              <Image
                src="/assets/window-icons/hide.svg"
                alt="Minimize"
                width={16}
                height={16}
              />
              <Image
                src="/assets/window-icons/full.svg"
                alt="Maximize"
                width={16}
                height={16}
              />
              <Image
                src="/assets/window-icons/x.svg"
                alt="Close"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex flex-col px-5 py-3 bg-rift-blue-1 gap-y-2 items-center justify-center border-b-2 border-rift-grey-900">
              {done ? (
                <>
                  <p className="font-bold uppercase text-center">DONE!</p>
                  <p className="text-center">Check on explorer</p>
                  <Link href={link || "#"} target="_blank">
                    <Image
                      src="/assets/done.png"
                      alt="Explorer"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-bold uppercase text-center">
                    Transaction Countdown
                  </p>
                  <p className="text-center">
                    Once the countdown ends, the transaction should be
                    completed.
                  </p>
                  {remainingTime && remainingTime > 0 ? (
                    <p className="font-bold text-[22px]">
                      {parseNumber(Math.floor(remainingTime / 60))}:
                      {parseNumber(Math.floor(remainingTime % 60))}
                    </p>
                  ) : (
                    <p>This is taking longer than usual...</p>
                  )}
                </>
              )}
              <Snake
                color1="#000000"
                color2="#000000"
                backgroundColor="#FFFFFF"
              />
            </div>
            <div className="h-8 w-full flex flex-row bg-rift-blue-3 border-b-2 border-rift-grey-900"></div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
