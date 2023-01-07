import { Box, Button, useToast } from "@chakra-ui/react";
import Head from "next/head";

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import {
	useAccount,
	useContractEvent,
	useContractWrite,
	usePrepareContractWrite,
	useProvider,
} from "wagmi";
import { AccessContext } from "../components/access";
import { abi } from "../components/contract";

type Props = {
	isOwner: Boolean;
	isFarmer: Boolean;
	isDistributor: Boolean;
	isRetailer: Boolean;
	isConsumer: Boolean;
	contractAddress: string;
};

export default function Home() {
	const { contractAddress, isOwner } = useContext(AccessContext);

	const toast = useToast();
	const { isDisconnected } = useAccount();
	const [farmer, setFarmer] = useState<string>("");
	const [distributor, setDistributor] = useState<string>("");
	const [retailer, setRetailer] = useState<string>("");
	const [consumer, setConsumer] = useState<string>("");

	const farmers = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "addFarmer",
		args: [farmer as `0x${string}`],
		enabled: ethers.utils.isAddress(farmer),
	});
	const addFarmer = useContractWrite(farmers.config);

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "FarmerAdded",
		listener(data, event) {
			toast({
				title: `Farmer added`,
				status: "success",
				description: `${data} is now a farmer`,
				duration: 20000,
				isClosable: true,
			});
		},
	});

	const handleAddFarmer = () => {
		addFarmer.reset();
		addFarmer.write?.();
	};

	const distributors = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "addDistributor",
		args: [distributor as `0x${string}`],
		enabled: ethers.utils.isAddress(distributor),
	});
	const addDistributor = useContractWrite(distributors.config);

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "DistributorAdded",
		listener(data, event) {
			toast({
				title: `Distributor added`,
				status: "success",
				description: `${data} is now a distributor`,
				duration: 20000,
				isClosable: true,
			});
		},
	});

	const handleAddDistributor = () => {
		addDistributor.reset();
		addDistributor.write?.();
	};

	const retailers = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "addRetailer",
		args: [retailer as `0x${string}`],
		enabled: ethers.utils.isAddress(retailer),
	});
	const addRetailer = useContractWrite(retailers.config);

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "RetailerAdded",
		listener(data, event) {
			toast({
				title: `Retailer added`,
				status: "success",
				description: `${data} is now a retailer`,
				duration: 20000,
				isClosable: true,
			});
		},
	});

	const handleAddRetailer = () => {
		addRetailer.reset();
		addRetailer.write?.();
	};

	const consumers = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "addConsumer",
		args: [consumer as `0x${string}`],
		enabled: ethers.utils.isAddress(consumer),
	});
	const addConsumer = useContractWrite(consumers.config);

	useContractEvent({
		address: contractAddress,
		abi: abi,
		eventName: "ConsumerAdded",
		listener(data, event) {
			toast({
				title: `Consumer added`,
				status: "success",
				description: `${data} is now a consumer`,
				duration: 20000,
				isClosable: true,
			});
		},
	});

	const handleAddConsumer = () => {
		addConsumer.reset();
		addConsumer.write?.();
	};

	const invalidFarmer = !ethers.utils.isAddress(farmer);
	const invalidDistributor = !ethers.utils.isAddress(distributor);
	const invalidRetailer = !ethers.utils.isAddress(retailer);
	const invalidConsumer = !ethers.utils.isAddress(consumer);

	if (isOwner) {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Manager</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box marginX="15%">
					<Box>
						<FormControl isDisabled={isDisconnected} isInvalid={invalidFarmer}>
							<FormLabel>Farmers</FormLabel>
							<Input
								type="text"
								value={farmer}
								onChange={(e) => setFarmer(e.target.value)}
							/>
							<FormErrorMessage>
								Add a valid blockchain address.
							</FormErrorMessage>
							<Button
								isDisabled={isDisconnected || invalidFarmer}
								onClick={handleAddFarmer}
							>
								Add farmer
							</Button>
						</FormControl>
					</Box>

					<Box>
						<FormControl
							isDisabled={isDisconnected}
							isInvalid={invalidDistributor}
						>
							<FormLabel>Distributors</FormLabel>
							<Input
								type="text"
								value={distributor}
								onChange={(e) => setDistributor(e.target.value)}
							/>
							<FormErrorMessage>
								Add a valid blockchain address.
							</FormErrorMessage>
							<Button
								isDisabled={isDisconnected || invalidDistributor}
								onClick={handleAddDistributor}
							>
								Add distributor
							</Button>
						</FormControl>
					</Box>

					<Box>
						<FormControl
							isDisabled={isDisconnected}
							isInvalid={invalidRetailer}
						>
							<FormLabel>Retailers</FormLabel>
							<Input
								type="text"
								value={retailer}
								onChange={(e) => setRetailer(e.target.value)}
							/>
							<FormErrorMessage>
								Add a valid blockchain address.
							</FormErrorMessage>
							<Button
								isDisabled={isDisconnected || invalidRetailer}
								onClick={handleAddRetailer}
							>
								Add retailer
							</Button>
						</FormControl>
					</Box>

					<Box>
						<FormControl
							isDisabled={isDisconnected}
							isInvalid={invalidConsumer}
						>
							<FormLabel>Consumers</FormLabel>
							<Input
								type="text"
								value={consumer}
								onChange={(e) => setConsumer(e.target.value)}
							/>
							<FormErrorMessage>
								Add a valid blockchain address.
							</FormErrorMessage>
							<Button
								isDisabled={isDisconnected || invalidConsumer}
								onClick={handleAddConsumer}
							>
								Add consumer
							</Button>
						</FormControl>
					</Box>
				</Box>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Coffee Supply Chain - Manager</title>
					<meta
						name="description"
						content="Udacity Blockchain developer project 3"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box>Managers only</Box>
			</>
		);
	}
}
