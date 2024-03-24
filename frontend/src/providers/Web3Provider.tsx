import { WagmiProvider, createConfig, http } from "wagmi";
import {
  baseSepolia,
  lineaTestnet,
  mainnet,
  optimismSepolia,
  polygonZkEvmTestnet,
  scrollTestnet,
  sepolia,
  thunderTestnet,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      sepolia,
      lineaTestnet,
      optimismSepolia,
      polygonZkEvmTestnet,
      scrollTestnet,
      {
        id: 443,
        name: "Ten Protocol",
        nativeCurrency: {
          name: "Ethereum",
          decimals: 18,
          symbol: "ETH",
        },
        rpcUrls: {
          default: {
            http: [
              `https://testnet.ten.xyz/v1/?token=7f1fd2d40fbe7d25e96b5d69429569291572232c`,
            ],
          },
        },
      },
      {
        id: 18,
        name: "ThunderCore",
        nativeCurrency: {
          name: "Ethereum",
          decimals: 18,
          symbol: "ETH",
        },
        rpcUrls: {
          default: {
            http: [`https://testnet-rpc.thundercore.com`],
          },
        },
      },
      {
        id: 48899,
        name: "Zircuit",
        nativeCurrency: {
          name: "Ethereum",
          decimals: 18,
          symbol: "ETH",
        },
        rpcUrls: {
          default: {
            http: [`https://zircuit1.p2pify.com/`],
          },
        },
      },
    ],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Rift",

    // Optional App Info
    appDescription: "World's first instant, gassless cross-chain bridge",
    ssr: true,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
