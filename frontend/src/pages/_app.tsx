import { Web3Provider } from "@/providers/Web3Provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ThirdwebProvider
        sdkOptions={{
          gasless: {
            openzeppelin: {
              relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL || "",
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </Web3Provider>
  );
}
