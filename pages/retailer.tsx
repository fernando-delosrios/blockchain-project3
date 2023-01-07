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
import { useContext, useState } from "react";
import { AccessContext, State } from "../components/access";
import { Item, ItemContext } from "../components/item";

export default function Retailer() {
	const { contractAddress, isRetailer, setLatestTransaction } =
		useContext(AccessContext);
	const { address } = useAccount();
	const { upc, itemState, item, setItem } = useContext(ItemContext);
	const toast = useToast();

	const receive = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "receiveItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		enabled: itemState === State.Shipped,
	});

	const doReceive = useContractWrite(receive.config);
	const handleReceive = () => {
		doReceive.reset();
		doReceive.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Received",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now received`,
				duration: 3000,
				isClosable: true,
			});
			setItem({
				...item,
				itemState: State[State.Received],
				retailerID: address as string,
			});
			setLatestTransaction(event.transactionHash);
		},
	});

	if (isRetailer) {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Retailer</title>
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
						onClick={handleReceive}
						isDisabled={itemState !== State.Shipped}
						width="150px"
					>
						Receive
					</Button>
				</HStack>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Retailer</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box>Retailers only</Box>
			</>
		);
	}
}
