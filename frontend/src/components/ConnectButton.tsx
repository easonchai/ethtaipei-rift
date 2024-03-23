import { ConnectKitButton } from "connectkit";
import Button from "./Button";

export const ConnectWallet = () => {
  const parseAddress = (address?: `0x${string}`) => {
    if (address) return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <Button onClick={show}>
            {isConnected ? parseAddress(address) : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
