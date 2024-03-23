import Button from "@/components/Button";
import Image from "next/image";
import dynamic from "next/dynamic";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import { parseOption } from "@/utils/formatting";
import RadioGroup from "@/components/RadioGroup";

const Snake = dynamic(() => import("@/components/Snake"), {
  ssr: false,
});

export default function Home() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [sendAsset, setSendAsset] = useState("USDT");
  const [providers, setProviders] = useState([
    {
      name: "BitBuddy",
      time: 10,
      receiveAmount: 130,
    },
    {
      name: "EtherElf",
      time: 20,
      receiveAmount: 110,
    },
    {
      name: "NiftyNaut",
      time: 21,
      receiveAmount: 100,
    },
    {
      name: "WebWiz",
      time: 201,
      receiveAmount: 10,
    },
    {
      name: "ChainChamp",
      time: 131,
      receiveAmount: 120,
    },
    {
      name: "DeFiDuke",
      time: 123,
      receiveAmount: 121,
    },
    {
      name: "CryptoCub",
      time: 1233,
      receiveAmount: 122,
    },
    {
      name: "DappDragon",
      time: 1233,
      receiveAmount: 123,
    },
  ]);
  const [selectedProvider, setSelectedProvider] = useState(providers[0].name);
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
      <div className="flex flex-row items-start justify-center gap-5 w-full">
        <div className="border-2 border-rift-grey-900 flex-1 flex flex-col max-w-[572px]">
          <div className="h-8 w-full flex flex-row px-5 py-2 justify-end gap-x-4 bg-rift-yellow-2 border-b-2 border-rift-grey-900">
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
              <p className="font-bold mr-3">SEND</p>
              <Dropdown
                options={["USDT", "USDC", "ETH", "BTC", "BNB"]}
                setOption={setSendAsset}
              />
            </div>
            <div className="flex flex-row w-full items-center">
              <p className="font-bold mr-3">FROM</p>
              <Dropdown
                options={[
                  "Ethereum Mainnet",
                  "Linea",
                  "Optimism",
                  "Polygon zkEVM",
                  "Scroll",
                  "ThunderCore",
                  "Zircuit",
                  "Ten Protocol",
                ]}
              />
            </div>
            <div className="flex flex-col w-full border-2 border-rift-grey-900 rounded-sm px-4 py-3 pb-0 bg-white">
              <div className="flex flex-row items-center justify-between">
                <p>Send:</p>
                <div className="flex flex-row border border-rift-grey-900 rounded-sm h-[29px] bg-white">
                  <p className="flex items-center justify-center w-[50px] cursor-pointer hover:bg-rift-grey-500">
                    25%
                  </p>
                  <p className="flex items-center justify-center w-[50px] cursor-pointer hover:bg-rift-grey-500 border-l border-r border-rift-grey-900">
                    50%
                  </p>
                  <p className="flex items-center justify-center w-[50px] cursor-pointer hover:bg-rift-grey-500">
                    MAX
                  </p>
                </div>
              </div>
              <div className="flex flex-row w-full items-end justify-between relative">
                <input
                  className="font-bold text-[44px] w-max outline-none "
                  type="text"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
                <div className="flex flex-grow-0 transform -translate-y-4 absolute right-0">
                  {parseOption(sendAsset)}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center relative h-10">
              <Image src={"/assets/bridge.svg"} alt="" fill />
            </div>
            <div className="flex flex-row w-full items-center">
              <p className="font-bold mr-3">TO</p>
              <Dropdown
                options={[
                  "Ethereum Mainnet",
                  "Linea",
                  "Optimism",
                  "Polygon zkEVM",
                  "Scroll",
                  "ThunderCore",
                  "Zircuit",
                  "Ten Protocol",
                ]}
              />
            </div>
            <div className="flex flex-col w-full border-2 border-rift-grey-900 rounded-sm px-4 py-3 pb-0 bg-white">
              <div className="flex flex-row items-center justify-between">
                <p>Received (Estimated best price):</p>
              </div>
              <div className="flex flex-row w-full items-end justify-between">
                <span className="font-bold text-[44px]">{receiveAmount}</span>
                <div className="flex flex-grow-0 transform -translate-y-4">
                  {parseOption(sendAsset)}
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 w-full flex flex-row bg-rift-yellow-3 border-b-2 border-rift-grey-900"></div>
        </div>
        <div className="border-2 border-rift-grey-900 flex-1 flex flex-col max-w-[572px]">
          <div className="h-8 w-full flex flex-row px-5 py-2 justify-end gap-x-4 bg-rift-purple-2 border-b-2 border-rift-grey-900">
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
            <div className="flex flex-col w-full px-5 max-h-[400px] overflow-y-scroll overflow-x-hidden scrollbar1 gap-y-3">
              <div className="flex flex-row w-full items-center justify-end gap-x-3">
                <p className="font-bold">SORT BY</p>
                <Dropdown options={["BEST PRICE", "FASTEST"]} />
              </div>
              <RadioGroup
                options={providers}
                asset={sendAsset}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
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
