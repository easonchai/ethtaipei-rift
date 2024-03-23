import Image from "next/image";

export const parseOption = (option: string) => {
  const asset = getAsset(option);
  return (
    <p className="flex flex-row gap-x-3 w-full flex-nowrap min-w-max font-bold">
      <Image src={asset} width={24} height={24} alt={option} />
      {option}
    </p>
  );
};

export const getAsset = (option: string) => {
  switch (option) {
    case "USDT":
      return "/assets/tokens/usdt.png";
    case "USDC":
      return "/assets/tokens/usdc.png";
    case "ETH":
      return "/assets/tokens/eth.png";
    case "BTC":
      return "/assets/tokens/btc.png";
    case "BNB":
      return "/assets/tokens/bnb.png";
    case "Ethereum Mainnet":
      return "/assets/chains/eth.png";
    case "Linea":
      return "/assets/chains/linea.png";
    case "Optimism":
      return "/assets/chains/optimism.png";
    case "Polygon zkEVM":
      return "/assets/chains/polygon.png";
    case "Scroll":
      return "/assets/chains/scroll.png";
    case "ThunderCore":
      return "/assets/chains/thundercore.png";
    case "Zircuit":
      return "/assets/chains/zircuit.png";
    case "Ten Protocol":
      return "/assets/chains/ten.png";
    default:
      return "/assets/tokens/eth.png";
  }
};
