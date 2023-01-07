import { ChakraProvider } from "@chakra-ui/react";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import AccessProvider from "../components/access";
import ItemProvider from "../components/item";
import Layout from "../components/layout";
import { client, WagmiConfig } from "../components/wagmi";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<WagmiConfig client={client}>
				<ConnectKitProvider>
					<AccessProvider>
						<ItemProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ItemProvider>
					</AccessProvider>
				</ConnectKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
}
