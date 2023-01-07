import Head from "next/head";
import { Box, Button, HStack, useToast } from "@chakra-ui/react";
import Browser from "../components/browser";
import { ethers } from "ethers";

import { BigNumber } from "ethers";
import {
	usePrepareContractWrite,
	useContractWrite,
	useContractEvent,
	useAccount,
} from "wagmi";
import { abi } from "../components/contract";
import { useContext } from "react";
import { AccessContext, State } from "../components/access";
import { Item, ItemContext } from "../components/item";

export default function Distributor() {
	const { contractAddress, isDistributor, setLatestTransaction } =
		useContext(AccessContext);
	const { address } = useAccount();
	const { upc, itemState, item, setItem } = useContext(ItemContext);
	const toast = useToast();

	const buy = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "buyItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		overrides: {
			value: ethers.utils.parseEther(
				Boolean(item.productPrice) ? item.productPrice : "0"
			),
		},
		enabled: itemState === State.ForSale,
	});

	const doBuy = useContractWrite(buy.config);
	const handleBuy = () => {
		doBuy.reset();
		doBuy.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Sold",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now sold`,
				duration: 3000,
				isClosable: true,
			});
			setItem({
				...item,
				itemState: State[State.Sold],
				distributorID: address as string,
			});
			setLatestTransaction(event.transactionHash);
		},
	});

	const ship = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "shipItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		enabled: itemState === State.Sold,
	});
	const doShip = useContractWrite(ship.config);
	const handleShip = () => {
		doShip.reset();
		doShip.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Shipped",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now shipped`,
				duration: 3000,
				isClosable: true,
			});
			setItem({
				...item,
				itemState: State[State.Shipped],
				distributorID: address as string,
			});
			setLatestTransaction(event.transactionHash);
		},
	});

	if (isDistributor) {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Distributor</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Browser editMode={false} />
				<HStack marginX="15%">
					<Button
						onClick={handleBuy}
						isDisabled={itemState !== State.ForSale}
						width="150px"
					>
						Buy
					</Button>
					<Button
						onClick={handleShip}
						isDisabled={itemState !== State.Sold}
						width="150px"
					>
						Ship
					</Button>
				</HStack>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Distributor</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box>Distributors only</Box>
			</>
		);
	}
}
