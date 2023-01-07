import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { abi } from "../components/contract";

import contracts from "./deployments";

type Props = {
	children: ReactElement;
};

enum State {
	Harvested, // 0
	Processed, // 1
	Packed, // 2
	ForSale, // 3
	Sold, // 4
	Shipped, // 5
	Received, // 6
	Purchased, // 7
}

type AccessProps = {
	contractAddress: string | undefined;
	isOwner: boolean;
	isFarmer: boolean;
	isDistributor: boolean;
	isRetailer: boolean;
	isConsumer: boolean;
	latestTransaction: string | undefined;
	setLatestTransaction: Dispatch<SetStateAction<string | undefined>>;
};

const AccessContext = createContext<AccessProps>({
	contractAddress: undefined,
	isOwner: false,
	isFarmer: false,
	isDistributor: false,
	isRetailer: false,
	isConsumer: false,
	latestTransaction: undefined,
	setLatestTransaction: new Object() as Dispatch<
		SetStateAction<string | undefined>
	>,
});
const { Provider } = AccessContext;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function AccessProvider({ children }: Props) {
	const [upc, setUpc] = useState<BigNumber | undefined>(undefined);
	const [isHydrated, setIsHydrated] = useState(false);
	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();
	const router = useRouter();

	const contractAddress = chain ? contracts[chain.id] : undefined;

	const { data: owner } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "owner",
		enabled: isConnected,
	});
	const isOwner =
		Boolean(address) && address?.toLowerCase() === owner?.toLowerCase();

	const { data: isFarmer } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "isFarmer",
		enabled: isConnected,
		args: [address as `0x${string}`],
	});

	const { data: isDistributor } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "isDistributor",
		enabled: isConnected,
		args: [address as `0x${string}`],
	});

	const { data: isRetailer } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "isRetailer",
		enabled: isConnected,
		args: [address as `0x${string}`],
	});

	const { data: isConsumer } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "isConsumer",
		enabled: isConnected,
		args: [address as `0x${string}`],
	});

	const [latestTransaction, setLatestTransaction] = useState<
		string | undefined
	>(undefined);

	const props: AccessProps = {
		contractAddress,
		isOwner,
		isFarmer: isFarmer ? true : false,
		isDistributor: isDistributor ? true : false,
		isRetailer: isRetailer ? true : false,
		isConsumer: isConsumer ? true : false,
		latestTransaction,
		setLatestTransaction,
	};

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (isHydrated) {
		return <Provider value={props}>{children}</Provider>;
	} else {
		return null;
	}
}

export { AccessContext, State };
