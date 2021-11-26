import React, { useState, useEffect } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import './viewPage.css';
import heartImage from '../img/heart.png';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newUrl",
				"type": "string"
			}
		],
		"name": "addVideo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "giveHeart",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newIndex",
				"type": "uint256"
			}
		],
		"name": "videoAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getVideo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "url",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct SNUTOK.Video",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVideoNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xFd5CD7b087124e609c48644538A456D63D2d4635";

function getSigner(library, account) {
	return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library, account) {
	return account ? getSigner(library, account) : library
}

function getContract(address, ABI, library, account) {
    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

function ViewPage(){
	const context = useWeb3React();
	const {connector, library, chainId, account, activate, deactivate, active, error} = context;
	const [url , setUrl] = useState("");
	const [index, setIndex] = useState(0);
	const [totalNum, setTotalNum] = useState(0);
	const [balance, setBalance] = useState(0);
	const [newUrl, setNewUrl] = useState("");
	const contract = getContract(contractAddress, abi, library, account);

	const check = async () => {
		console.log("check start");
		let isAuthorized = await injected.isAuthorized()
		console.log("isAuthorized");
		console.log(isAuthorized);
		if (isAuthorized) {
			try {
				await activate(injected);
			} catch(err) {
				console.error(err);
			}
		}
		console.log("check finish");
	}

	const init = async () => {
		console.log("init start");
		activate(injected);
		check();
		console.log("init finish");
	}

	const update = async () => {
		console.log("update start");
		let isAuthorized = await injected.isAuthorized()
		console.log("isAuthorized");
		console.log(isAuthorized);
		if (isAuthorized) {
			try {
				await activate(injected);
				if(!!library && !!account) {
					if(index === undefined || index === null || isNaN(index)){
						setIndex(0);
					}
					let video = await contract.getVideo(index);
					let num = await contract.getVideoNum();
					let bal = await contract.balanceOf(account);
					setTotalNum(num);
					setUrl("https://www.youtube.com/embed/" + video.url.substring(32));
					setBalance(parseInt(bal['_hex']));
				}
			} catch(err) {
				console.error(err);
			}
		}
		console.log("update finish");
	};

	useEffect(() => {
		init();
		update();
	}, []);
	useEffect(() => {
		update();
    }, [account, library, chainId, active, index, balance]);
	
	const incrementIndex = async () => {
		console.log("increment start");
		update();
		let num = await contract.getVideoNum();
		console.log("totalNum2");
		console.log(totalNum['_hex']);
		setTotalNum(num);
		if(totalNum !== 0){
			setIndex((index + 1) % totalNum);
		}
		console.log("index");
		console.log(index);
		console.log("increment finish");
	}

	const addVideo = async () => {
		console.log("addVideo start");
		check();
		contract.addVideo(newUrl);
		contract.on('videoAdded', (newIndex) => {
			setIndex(newIndex['_hex']);
		})
		console.log("addVideo finish");
	}

	const giveHeart = async () => {
		console.log("giveHeart start");
		check();
		contract.giveHeart(index);
		console.log("giveHeart finish");
	}

    return (
        <div class='page'>
            <h1>View Video</h1>
			<div>
            	{url && <iframe class='item' width="50%" height="500px" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
			</div>
			<div>
			<button id='like'><img id='heart' src={heartImage} alt='heart' onClick = {() => giveHeart()}/></button>
				<button class='button' onClick = {() => incrementIndex()}>Change</button>
				<input id='input' value={newUrl} onChange={(event) => setNewUrl(event.target.value)}></input>
				<button class='button' onClick = {() => addVideo()}>Add Video</button>
				<h3>Current Balance: {balance}</h3>
			</div>
		</div>
    );
}

export default ViewPage;