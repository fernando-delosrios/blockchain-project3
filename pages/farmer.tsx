import Head from "next/head";
import { Box, Button, HStack, useToast } from "@chakra-ui/react";
import Browser from "../components/browser";

import { BigNumber } from "ethers";
import {
	usePrepareContractWrite,
	useContractWrite,
	useProvider,
	useContractEvent,
	useAccount,
} from "wagmi";
import { abi } from "../components/contract";
import { useContext, useState } from "react";
import { AccessContext, State } from "../components/access";
import { blankItem, Item, ItemContext } from "../components/item";
import { ethers } from "ethers";

export default function Farmer() {
	const { contractAddress, isFarmer, setLatestTransaction } =
		useContext(AccessContext);

	const { upc, itemState, item, setItem } = useContext(ItemContext);

	const toast = useToast();
	const provider = useProvider();
	const [editMode, setEditMode] = useState(false);
	const { address } = useAccount();
	const [triggerHarvest, setTriggerHarvest] = useState(false);

	const defaultItem: Item = {
		sku: "",
		upc: "",
		ownerID: address as string,
		originFarmerID: address as string,
		originFarmName: "",
		originFarmInformation: "",
		originFarmLatitude: "",
		originFarmLongitude: "",
		productID: "",
		productNotes: "",
		productPrice: "",
		itemState: State[State.Harvested],
		distributorID: "",
		retailerID: "",
		consumerID: "",
	};

	const harvest = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "harvestItem",
		args: [
			BigNumber.from(upc === undefined ? 0 : upc),
			item?.originFarmerID as `0x${string}`,
			item?.originFarmName,
			item?.originFarmInformation,
			item?.originFarmLatitude,
			item?.originFarmLongitude,
			item?.productNotes,
		],
		enabled: triggerHarvest,
		chainId: provider.network.chainId,
	});
	const doHarvest = useContractWrite(harvest.config);

	const process = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "processItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		enabled: itemState === State.Harvested,
	});

	const doProcess = useContractWrite(process.config);
	const handleProcess = () => {
		doProcess.reset();
		doProcess.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Processed",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now processed`,
				duration: 3000,
				isClosable: true,
			});
			setItem({ ...item, itemState: State[State.Processed] });
			setLatestTransaction(event.transactionHash);
		},
	});

	const pack = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "packItem",
		args: [BigNumber.from(upc === undefined ? 0 : upc)],
		enabled: itemState === State.Processed,
	});
	const doPack = useContractWrite(pack.config);
	const handlePack = () => {
		doPack.reset();
		doPack.write?.();
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "Packed",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now packed`,
				duration: 3000,
				isClosable: true,
			});
			setItem({ ...item, itemState: State[State.Packed] });
			setLatestTransaction(event.transactionHash);
		},
	});

	const sell = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "sellItem",
		args: [
			BigNumber.from(upc === undefined ? 0 : upc),
			ethers.utils.parseEther(
				Boolean(item.productPrice) ? item.productPrice : "0"
			),
		],
		enabled: itemState === State.Packed,
	});
	const doSell = useContractWrite(sell.config);

	const handleSell = () => {
		setEditMode(editMode ? false : true);
	};

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "ForSale",
		listener(data, event) {
			toast({
				title: `Coffee Transaction`,
				status: "success",
				description: `UPC ${data} is now for sale`,
				duration: 3000,
				isClosable: true,
			});
			setItem({ ...item, itemState: State[State.ForSale] });
			setLatestTransaction(event.transactionHash);
		},
	});

	const handleHarvest = () => {
		if (editMode) {
			setEditMode(false);
		} else {
			setItem(defaultItem);
			setEditMode(true);
		}
	};

	const handleSave = () => {
		if (item.itemState === State[State.Harvested]) {
			setTriggerHarvest(true);
			setTimeout(() => {
				doHarvest.reset();
				doHarvest.write?.();
				setTriggerHarvest(false);
			}, 200);
		} else if (itemState === State.Packed) {
			doSell.reset();
			doSell.write?.();
		}
		setEditMode(false);
	};

	const handleCancel = () => {
		if (itemState === State.Harvested) {
			setItem(blankItem);
		}
		setEditMode(false);
	};

	if (isFarmer) {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Farmer</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Browser editMode={editMode} />
				<HStack marginX="15%" gap="7px">
					<Button onClick={handleHarvest} isDisabled={editMode} width="150px">
						Harvest
					</Button>
					<Button
						onClick={handleProcess}
						isDisabled={itemState !== State.Harvested || editMode}
						width="150px"
					>
						Process
					</Button>
					<Button
						onClick={handlePack}
						isDisabled={itemState !== State.Processed || editMode}
						width="150px"
					>
						Pack
					</Button>
					<Button
						onClick={handleSell}
						isDisabled={itemState !== State.Packed || editMode}
						width="150px"
					>
						Sell
					</Button>
				</HStack>
				{editMode && (
					<HStack gap="7px">
						<Button onClick={handleSave} width="150px">
							Save
						</Button>
						<Button onClick={handleCancel} width="150px">
							Cancel
						</Button>
					</HStack>
				)}
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Farmer</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box>Farmers only</Box>
			</>
		);
	}
}
