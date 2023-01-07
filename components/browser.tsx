import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	useToast,
	HStack,
	VStack,
	Wrap,
	Grid,
	Spacer,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Text,
	Link,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { ChangeEvent, useContext, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "../components/contract";
import { AccessContext } from "./access";
import { Item, ItemContext, State } from "./item";

type Props = {
	editMode: boolean;
};

export default function Browser({ editMode }: Props) {
	const {
		item,
		setItem,
		upc,
		itemState,
		harvestedTx,
		processedTx,
		packedTx,
		forSaleTx,
		soldTx,
		shippedTx,
		purchasedTx,
	} = useContext(ItemContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState(
		upc instanceof BigNumber ? upc.toString() : ""
	);
	const toast = useToast();
	const { contractAddress } = useContext(AccessContext);

	const isError = search === "";

	const { data: fetchItemBufferOne } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "fetchItemBufferOne",
		args: [BigNumber.from(search.length > 0 ? search : 0)],
		enabled: !isError,
	});

	const { data: fetchItemBufferTwo } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: "fetchItemBufferTwo",
		args: [BigNumber.from(search.length > 0 ? search : 0)],
		enabled: !isError,
	});

	const handleOnSearch = () => {
		if (fetchItemBufferOne && fetchItemBufferTwo) {
			const item: Item = {
				sku: fetchItemBufferOne.itemSKU.toString(),
				upc: fetchItemBufferOne.itemUPC.toString(),
				ownerID: fetchItemBufferOne.ownerID,
				originFarmerID: fetchItemBufferOne.originFarmerID,
				originFarmName: fetchItemBufferOne.originFarmName,
				originFarmInformation: fetchItemBufferOne.originFarmInformation,
				originFarmLatitude: fetchItemBufferOne.originFarmLatitude,
				originFarmLongitude: fetchItemBufferOne.originFarmLongitude,
				productID: fetchItemBufferTwo.productID.toString(),
				productNotes: fetchItemBufferTwo.productNotes,
				productPrice: fetchItemBufferTwo.productPrice.toString(),
				itemState: State[fetchItemBufferTwo.itemState.toNumber()],
				distributorID: fetchItemBufferTwo.distributorID,
				retailerID: fetchItemBufferTwo.retailerID,
				consumerID: fetchItemBufferTwo.consumerID,
			};
			if (search === fetchItemBufferOne.itemUPC.toString()) {
				setItem(item);
			} else {
				toast({
					title: `Coffee Search`,
					status: "error",
					description: `UPC ${search} not found`,
					duration: 3000,
					isClosable: true,
				});
			}
		}
	};

	const handleOnEdit = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;
		item[id as keyof Item] = value;
		setItem({ ...item });
	};

	const isPacked = itemState === State.Packed;

	return (
		<>
			<Box marginX="15%" marginY="10">
				<HStack marginBottom="7px">
					<VStack width="50%">
						<FormControl
							isInvalid={isError && !editMode}
							isDisabled={editMode && isPacked}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">UPC</FormLabel>
							<HStack width="70%" alignItems="flex-end">
								<VStack width="100%">
									<FormErrorMessage position="absolute" top="-25px">
										Unsigned integer required
									</FormErrorMessage>
									<NumberInput
										min={1}
										value={search}
										onChange={setSearch}
										id="upc"
										width="100%"
									>
										<NumberInputField />
									</NumberInput>
								</VStack>
								<Button
									onClick={handleOnSearch}
									isDisabled={editMode || isError}
									marginLeft="1"
									width="150px"
								>
									Search
								</Button>
							</HStack>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">SKU</FormLabel>
							<Input type="text" id="sku" value={item?.sku} width="70%" />
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Product ID</FormLabel>
							<Input
								type="text"
								id="productID"
								value={item?.productID}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode && !isPacked}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Product Price</FormLabel>
							<Input
								type="text"
								id="productPrice"
								value={item?.productPrice}
								onChange={handleOnEdit}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Item State</FormLabel>
							<HStack width="70%">
								<Input type="text" id="itemState" value={item?.itemState} />
								<Button
									onClick={onOpen}
									isDisabled={upc === undefined}
									width="150px"
								>
									Details
								</Button>
							</HStack>
						</FormControl>
					</VStack>
					<VStack width="50%">
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Owner ID</FormLabel>
							<Input
								type="text"
								id="ownerID"
								value={item?.ownerID}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Origin Farmer ID</FormLabel>
							<Input
								type="text"
								id="originFarmerID"
								value={item?.originFarmerID}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Distributor ID</FormLabel>
							<Input
								type="text"
								id="distributorID"
								value={item?.distributorID}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Retailer ID</FormLabel>
							<Input
								type="text"
								id="retailerID"
								value={item?.retailerID}
								width="70%"
							/>
						</FormControl>
						<FormControl
							isReadOnly={!editMode}
							isDisabled={editMode}
							display="flex"
							alignItems="center"
						>
							<FormLabel width="30%">Consumer ID</FormLabel>
							<Input
								type="text"
								id="consumerID"
								value={item?.consumerID}
								width="70%"
							/>
						</FormControl>
					</VStack>
				</HStack>
				<VStack>
					<HStack alignContent="stretch" width="100%">
						<FormControl
							isReadOnly={!editMode}
							isDisabled={isPacked && editMode}
							display="flex"
							alignItems="center"
							flexGrow={1}
							width="50%"
						>
							<FormLabel width="30%">Origin Farm Name</FormLabel>
							<Input
								type="text"
								id="originFarmName"
								value={item?.originFarmName}
								onChange={handleOnEdit}
								width="70%"
							/>
						</FormControl>
						<HStack width="50%" flexGrow={1}>
							<FormControl
								isReadOnly={!editMode}
								isDisabled={isPacked && editMode}
								display="flex"
								alignItems="center"
								// justifyContent="space-between"
							>
								<FormLabel width="60%">Origin Farm Latitude</FormLabel>
								<Input
									type="text"
									id="originFarmLatitude"
									value={item?.originFarmLatitude}
									onChange={handleOnEdit}
									width="100px"
								/>
							</FormControl>
							<FormControl
								isReadOnly={!editMode}
								isDisabled={isPacked && editMode}
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<FormLabel>Origin Farm Longitude</FormLabel>
								<Input
									type="text"
									id="originFarmLongitude"
									value={item?.originFarmLongitude}
									onChange={handleOnEdit}
									width="100px"
								/>
							</FormControl>
						</HStack>
					</HStack>
					<FormControl
						isReadOnly={!editMode}
						isDisabled={isPacked && editMode}
						display="flex"
						alignItems="center"
					>
						<FormLabel width="15%">Origin Farm Information</FormLabel>
						<Input
							type="text"
							id="originFarmInformation"
							value={item?.originFarmInformation}
							onChange={handleOnEdit}
							width="85%"
						/>
					</FormControl>

					<FormControl
						isReadOnly={!editMode}
						isDisabled={isPacked && editMode}
						display="flex"
						alignItems="center"
					>
						<FormLabel width="15%">Product Notes</FormLabel>
						<Input
							type="text"
							id="productNotes"
							value={item?.productNotes}
							onChange={handleOnEdit}
							width="85%"
						/>
					</FormControl>
				</VStack>
			</Box>
			<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						Transaction details
					</DrawerHeader>
					<DrawerBody>
						{harvestedTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${harvestedTx}`}
									target="_blank"
								>
									Harvested
								</Link>
							</VStack>
						)}
						{processedTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${processedTx}`}
									target="_blank"
								>
									Processed
								</Link>
							</VStack>
						)}
						{packedTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${packedTx}`}
									target="_blank"
								>
									Packed
								</Link>
							</VStack>
						)}
						{forSaleTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${forSaleTx}`}
									target="_blank"
								>
									For Sale
								</Link>
							</VStack>
						)}
						{soldTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${soldTx}`}
									target="_blank"
								>
									Sold
								</Link>
							</VStack>
						)}
						{shippedTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${shippedTx}`}
									target="_blank"
								>
									Shipped
								</Link>
							</VStack>
						)}
						{purchasedTx && (
							<VStack>
								<Link
									href={`https://goerli.etherscan.io/tx/${purchasedTx}`}
									target="_blank"
								>
									Purchased
								</Link>
							</VStack>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
