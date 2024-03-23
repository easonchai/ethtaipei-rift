import Image from "next/image";

export const parseOption = (option: string) => {
  const asset = getAsset(option);
  return (
    <p className="flex flex-row gap-x-3 w-full flex-nowrap min-w-max font-bold">
      {asset && <Image src={asset} width={24} height={24} alt={option} />}
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
      return null;
  }
};

export const parseBigIntString = (bigIntStr: string) => {
  // Pad the string with leading zeros if it's shorter than 18 characters
  bigIntStr = bigIntStr.padStart(19, "0");

  // Extract the integer part and the fractional part
  const integerPart = bigIntStr.slice(0, -18) || "0";
  let fractionalPart = bigIntStr.slice(-18);

  // Remove trailing zeros from the fractional part
  fractionalPart = fractionalPart.replace(/0+$/, "");

  // If the fractional part is longer than 4 digits, truncate it
  if (fractionalPart.length > 4) {
    fractionalPart = fractionalPart.substring(0, 4);
  }

  // Combine the integer and fractional parts
  let result = integerPart;
  if (fractionalPart.length > 0) {
    result += "." + fractionalPart;
  }

  // If the result ends with '.', remove it
  result = result.replace(/\.$/, "");

  return result;
};
