import Button from "@/components/Button";
import Image from "next/image";
import dynamic from "next/dynamic";
import Dropdown from "@/components/Dropdown";

const Snake = dynamic(() => import("@/components/Snake"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 lg:px-24 gap-y-10 py-2 bg-cover bg-center object-fill text-rift-grey-900">
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-1 flex-grow"></div>
        <Image
          src={"/assets/logo.svg"}
          alt="Rift"
          width={120}
          height={120}
          className="flex-grow-0"
        />
        <div className="flex flex-1 flex-grow items-center flex-row justify-end">
          <Button>Connect Wallet</Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 w-full">
        <div className="border-2 border-rift-grey-900 flex-1 flex flex-col max-w-[572px]">
          <div className="h-8 w-full flex flex-row px-2 py-5 items-end gap-x-4 bg-rift-yellow-2 border-b-2 border-rift-grey-900">
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
            />
          </div>
          <div className="flex flex-col px-5 py-3 bg-rift-yellow-1 gap-y-3 border-b-2 border-rift-grey-900">
            <div className="flex flex-row w-full items-center">
              <p className="font-bold mr-3">Send</p>
              <Dropdown options={["USDT", "USDC", "ETH", "BTC", "BNB"]} />
            </div>
          </div>
          <div className="h-8 w-full flex flex-row bg-rift-yellow-3 border-b-2 border-rift-grey-900"></div>
        </div>
        <div className="border-2 border-rift-grey-900 flex-1 flex flex-col max-w-[572px]">
          <div className="h-8 w-full flex flex-row px-2 py-5 items-end gap-x-4 bg-rift-purple-2 border-b-2 border-rift-grey-900">
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
            />
          </div>
          <div className="flex flex-col bg-rift-purple-1 border-b-2 border-rift-grey-900 w-full">
            <div className="flex flex-row items-end justify-end w-full h-4">
              <Image
                src={"/assets/window-icons/up.svg"}
                width={16}
                height={16}
                alt="up"
              />
            </div>
            <div className="flex flex-col w-full px-5 max-h-[400px] overflow-y-scroll overflow-x-hidden scrollbar1">
              <div className="flex flex-row w-full items-center justify-end gap-x-3">
                <p className="font-bold">SORT BY</p>
                <Dropdown options={["BEST PRICE", "FASTEST"]} />
              </div>
            </div>
            <div className="flex flex-row items-end justify-end w-full">
              <Image
                src={"/assets/window-icons/down.svg"}
                width={16}
                height={16}
                alt="down"
              />
            </div>
          </div>
          <div className="h-8 w-full flex flex-row bg-rift-purple-3 border-b-2 border-rift-grey-900"></div>
        </div>
      </div>

      <Button disabled>Bridge</Button>

      {/* <Snake color1="#000000" color2="#000000" backgroundColor="#FFFFFF" /> */}
    </main>
  );
}
