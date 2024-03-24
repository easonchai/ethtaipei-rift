import Button from "@/components/Button";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { parseBigIntString, parseOption } from "@/utils/formatting";
import RadioGroup from "@/components/RadioGroup";
import { ConnectWallet } from "@/components/ConnectButton";
import Head from "next/head";
import Modal from "@/components/Modal";
import { ethers } from "ethers";
import { useDebounce } from "use-debounce";
import { useSignTypedData, useAccount } from "wagmi";

const networks = [
  "Ethereum Mainnet",
  "Linea",
  "Optimism",
  "Polygon zkEVM",
  "Scroll",
  "ThunderCore",
  "Zircuit",
  "Ten Protocol",
];

export default function Home() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [amount] = useDebounce(sendAmount, 1000);
  const [sendAsset, setSendAsset] = useState("USDT");
  const [providers, setProviders] = useState<
    {
      name: string;
      time: number;
      receiveAmount: string;
    }[]
  >();
  const [sourceChain, setSourceChain] = useState(networks[0]);
  const [destinationChain, setDestinationChain] = useState(networks[1]);
  const [selectedProvider, setSelectedProvider] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { data, signTypedData } = useSignTypedData();
  const { address } = useAccount();

  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const generateProviders = () => {
    const providers = [
      "BitBuddy",
      "EtherElf",
      "NiftyNaut",
      "WebWiz",
      "ChainChamp",
      "DeFiDuke",
      "CryptoCub",
      "DappDragon",
    ];

    const fees = {
      ETH: {
        min: 0.001,
        max: 0.005,
      },
      USDT: {
        min: 10,
        max: 40,
      },
      USDC: {
        min: 10,
        max: 40,
      },
      BTC: {
        min: 0.000078,
        max: 0.00047,
      },
    };
    const feeData = (fees as any)[sendAsset];

    const data = [];
    for (const provider of providers) {
      const fee = randomNumber(feeData.min, feeData.max);
      const sla = randomNumber(1, 300);
      const quote = ethers.utils
        .parseEther(amount)
        .sub(ethers.utils.parseEther(`${fee}`));
      data.push({
        name: provider,
        time: sla,
        receiveAmount: quote.lt(0) ? "0" : quote.toString(),
      });
    }

    data.sort((a, b) => {
      const diff = BigInt(b.receiveAmount) - BigInt(a.receiveAmount);
      return diff > 0 ? 1 : diff < 0 ? -1 : 0;
    });

    setProviders(data);
  };

  const bridge = () => {
    signTypedData({
      types: {
        Sender: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        BridgeRequest: [
          { name: "from", type: "Sender" },
          { name: "to", type: "Sender" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "expiryTime", type: "uint256" },
        ],
      },
      primaryType: "BridgeRequest",
      message: {
        from: {
          name: "Sender",
          wallet: address!,
        },
        to: {
          name: "Provider",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        token: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        amount: ethers.utils.parseEther(amount).toBigInt(),
        expiryTime: BigInt(Math.floor(Date.now() / 1000) + 60 * 60),
      },
    });
  };

  useEffect(() => {
    if (data) {
      setIsOpen(true);
    }
  }, [data]);

  useEffect(() => {
    if (providers) {
      setSelectedProvider(providers[0].name);
    }
  }, [providers]);

  useEffect(() => {
    if (selectedProvider && providers) {
      const provider = providers.find((p) => p.name === selectedProvider);
      if (provider) {
        setReceiveAmount(provider.receiveAmount);
      }
    }
  }, [selectedProvider, providers]);

  useEffect(() => {
    if (Number(amount) > 0) {
      generateProviders();
    }
  }, [amount]);

  return (
    <>
      <Head>
        <title>Rift</title>
        <meta
          property="description"
          content="Rift is the world's first instant, gasless cross-chain bridge for any token"
        />
      </Head>
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
            <ConnectWallet />
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
                  value={sendAsset}
                  setValue={setSendAsset}
                />
              </div>
              <div className="flex flex-row w-full items-center">
                <p className="font-bold mr-3">FROM</p>
                <Dropdown
                  options={networks}
                  value={sourceChain}
                  setValue={setSourceChain}
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
                  options={networks}
                  value={destinationChain}
                  setValue={setDestinationChain}
                />
              </div>
              <div className="flex flex-col w-full border-2 border-rift-grey-900 rounded-sm px-4 py-3 pb-0 bg-white">
                <div className="flex flex-row items-center justify-between">
                  <p>Received (Estimated best price):</p>
                </div>
                <div className="flex flex-row w-full items-end justify-between">
                  <span className="font-bold text-[44px]">
                    {parseBigIntString(receiveAmount)}
                  </span>
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
            {providers && providers.length > 0 && (
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
                    <Dropdown
                      options={["BEST PRICE", "FASTEST"]}
                      value="BEST PRICE"
                      setValue={() => console.log("Wow")}
                    />
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
            )}
            <div className="h-8 w-full flex flex-row bg-rift-purple-3 border-b-2 border-rift-grey-900"></div>
          </div>
        </div>

        <Button
          disabled={!receiveAmount || Number(receiveAmount) < 1}
          onClick={bridge}
        >
          Bridge
        </Button>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            time={
              providers?.find((provider) => provider.name === selectedProvider)
                ?.time
            }
          />
        )}
      </main>
    </>
  );
}
