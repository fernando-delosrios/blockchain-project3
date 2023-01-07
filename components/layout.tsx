import type { AppProps } from "next/app";
import { ConnectKitButton } from "connectkit";
import { abi } from "../components/contract";
import { useRouter } from "next/router";
import { Spacer, Tab, TabList, Tabs } from "@chakra-ui/react";
import {
	FC,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAccount, useContractRead } from "wagmi";
import React from "react";
import { AccessContext } from "./access";

const tabs = [
	{ index: 0, path: "/" },
	{ index: 1, path: "/farmer" },
	{ index: 2, path: "/distributor" },
	{ index: 3, path: "/retailer" },
	{ index: 4, path: "/consumer" },
];

type Props = {
	children: ReactElement;
};

export default function Layout({ children }: Props) {
	const [tabIndex, setTabIndex] = useState(0);
	const {
		contractAddress,
		isOwner,
		isFarmer,
		isDistributor,
		isRetailer,
		isConsumer,
		upc,
		setUpc,
		itemState,
	} = useContext(AccessContext);

	const router = useRouter();
	useEffect(() => {
		const tab = tabs.find((t) => t.path === router.pathname);
		setTabIndex(tab ? tab.index : 0);
	}, [router.pathname]);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
		const tab = tabs.find((t) => t.index === index);
		router.push(tab ? tab.path : "/");
	};

	return (
		<main>
			<Tabs defaultIndex={0} index={tabIndex} onChange={handleTabsChange}>
				<TabList height="44px">
					<Tab marginTop="auto" isDisabled={!isOwner}>
						Manager
					</Tab>
					<Tab marginTop="auto" isDisabled={!isFarmer}>
						Farmer
					</Tab>
					<Tab marginTop="auto" isDisabled={!isDistributor}>
						Distributor
					</Tab>
					<Tab marginTop="auto" isDisabled={!isRetailer}>
						Retailer
					</Tab>
					<Tab marginTop="auto" isDisabled={!isConsumer}>
						Consumer
					</Tab>
					<Spacer />
					<ConnectKitButton />
				</TabList>
			</Tabs>
			{children}
		</main>
	);
}
