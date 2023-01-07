export const abi = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "ConsumerAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "ConsumerRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "DistributorAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "DistributorRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "FarmerAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "FarmerRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "ForSale",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Harvested",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Packed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Processed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Purchased",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Received",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "RetailerAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "RetailerRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Shipped",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "upc",
				type: "uint256",
			},
		],
		name: "Sold",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "oldOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "TransferOwnership",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "addConsumer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "addDistributor",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "addFarmer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "addRetailer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "isConsumer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "isDistributor",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "isFarmer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "isOwner",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "isRetailer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "itemsHistory",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceConsumer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceDistributor",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceFarmer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceRetailer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getUpcs",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getNextUpc",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "kill",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_originFarmerID",
				type: "address",
			},
			{
				internalType: "string",
				name: "_originFarmName",
				type: "string",
			},
			{
				internalType: "string",
				name: "_originFarmInformation",
				type: "string",
			},
			{
				internalType: "string",
				name: "_originFarmLatitude",
				type: "string",
			},
			{
				internalType: "string",
				name: "_originFarmLongitude",
				type: "string",
			},
			{
				internalType: "string",
				name: "_productNotes",
				type: "string",
			},
		],
		name: "harvestItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "processItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "packItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
		],
		name: "sellItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "buyItem",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "shipItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "receiveItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "purchaseItem",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "fetchItemBufferOne",
		outputs: [
			{
				internalType: "uint256",
				name: "itemSKU",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "itemUPC",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "ownerID",
				type: "address",
			},
			{
				internalType: "address",
				name: "originFarmerID",
				type: "address",
			},
			{
				internalType: "string",
				name: "originFarmName",
				type: "string",
			},
			{
				internalType: "string",
				name: "originFarmInformation",
				type: "string",
			},
			{
				internalType: "string",
				name: "originFarmLatitude",
				type: "string",
			},
			{
				internalType: "string",
				name: "originFarmLongitude",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_upc",
				type: "uint256",
			},
		],
		name: "fetchItemBufferTwo",
		outputs: [
			{
				internalType: "uint256",
				name: "itemSKU",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "itemUPC",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "productID",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "productNotes",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "productPrice",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "itemState",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "distributorID",
				type: "address",
			},
			{
				internalType: "address",
				name: "retailerID",
				type: "address",
			},
			{
				internalType: "address",
				name: "consumerID",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
] as const;
