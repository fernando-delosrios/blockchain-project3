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

export default function Consumer() {
	const { contractAddress, isConsumer, setLatestTransaction } =
		useContext(AccessContext);
	const { address } = useAccount();
	const { upc, itemState, item, setItem } = useContext(ItemContext);
	const toast = useToast();

	const purchase = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "purchaseItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		overrides: {
			value: ethers.utils.parseEther(
				Boolean(item.productPrice) ? item.productPrice : "0"
			),
		},
		enabled: itemState === State.Received,
	});
	const doPurchase = useContractWrite(purchase.config);
	const handlePurchase = () => {
		doPurchase.reset();
		doPurchase.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Purchased",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now purchased`,
				duration: 3000,
				isClosable: true,
			});
			setItem({
				...item,
				itemState: State[State.Purchased],
				consumerID: address as string,
			});
			setLatestTransaction(event.transactionHash);
		},
	});

	if (isConsumer) {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Consumer</title>
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
						onClick={handlePurchase}
						isDisabled={itemState !== State.Received}
						width="150px"
					>
						Purchase
					</Button>
				</HStack>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Consumer</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box>Consumers only</Box>
			</>
		);
	}
}
