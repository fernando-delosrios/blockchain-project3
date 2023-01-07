import {
	Chain,
	configureChains,
	createClient,
	goerli,
	WagmiConfig,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultClient } from "connectkit";

const localhost: Chain = {
	id: 1337,
	name: "Localhost 8545",
	network: "localhost",
	nativeCurrency: { name: "Ethereum", decimals: 18, symbol: "ETH" },
	rpcUrls: { default: { http: ["http://localhost:8545"] } },
	testnet: true,
};

const { chains, provider } = configureChains(
	[goerli, localhost],
	[publicProvider()]
);

// const client = createClient({
// 	connectors: [
// 		new InjectedConnector({
// 			chains,
// 			options: {
// 				name: "Injected",
// 				shimDisconnect: true,
// 			},
// 		}),
// 	],
// 	provider,
// });

const client = createClient(
	getDefaultClient({
		appName: "Coffee Supply Chain",
		chains,
	})
);

type Props = {
	children: JSX.Element | JSX.Element[] | undefined;
};

const WagmiProvider = ({ children }: Props) => {
	return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export { client, goerli, localhost, WagmiConfig, WagmiProvider };
