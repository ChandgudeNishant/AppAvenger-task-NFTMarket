// import { useState } from "react";
// import { ethers } from "ethers";
// import { create as ipfsHttpClient } from "ipfs-http-client";
// import { useRouter } from "next/router";
// import Web3Modal from "web3modal";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// import { nftaddress, nftmarketaddress } from "../config";
// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
// import { EtherscanProvider } from "@ethersproject/providers";
// import Image from "next/image";

// export default function CreateItem() {
//   const projectId = 'ac2bb441cbe6484298cb45b82d8d7ef3';
//   const [fileUrl, setFileUrl] = useState(null);
//   const [formInput, updateFormInput] = useState({
//     price: "",
//     name: "",
//     description: "",
//   });
//   const router = useRouter();

//   async function onChange(e) {
//     const file = e.target.files[0];
//     try {
//       //try uploading the file
//       const added = await client.add(file, {
//         progress: (prog) => console.log(`received: ${prog}`),
//       });
//       //file saved in the url path below
//       const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//       setFileUrl(url);
//     } catch (e) {
//       console.log("Error uploading file: ", e);
//     }
//   }

//   //1. create item (image/video) and upload to ipfs
//   async function createItem() {
//     const { name, description, price } = formInput; //get the value from the form input

//     //form validation
//     if (!name || !description || !price || !fileUrl) {
//       return;
//     }

//     const data = JSON.stringify({
//       name,
//       description,
//       image: fileUrl,
//     });

//     try {
//       const added = await client.add(data);
//       const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//       //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
//       createSale(url);
//     } catch (error) {
//       console.log(`Error uploading file: `, error);
//     }
//   }

//   //2. List item for sale
//   async function createSale(url) {
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);

//     //sign the transaction
//     const signer = provider.getSigner();
//     let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
//     let transaction = await contract.createToken(url);
//     let tx = await transaction.wait();

//     //get the tokenId from the transaction that occured above
//     //there events array that is returned, the first item from that event
//     //is the event, third item is the token id.
//     console.log("Transaction: ", tx);
//     console.log("Transaction events: ", tx.events[0]);
//     let event = tx.events[0];
//     let value = event.args[2];
//     let tokenId = value.toNumber(); //we need to convert it a number

//     //get a reference to the price entered in the form
//     const price = ethers.utils.parseUnits(formInput.price, "ether");

//     contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

//     //get the listing price
//     let listingPrice = await contract.getListingPrice();
//     listingPrice = listingPrice.toString();

//     transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
//       value: listingPrice,
//     });

//     await transaction.wait();

//     router.push("/");
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="w-1/2 flex flex-col pb-12">
//         <input
//           placeholder="Asset Name"
//           className="mt-8 border rounded p-4"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, name: e.target.value })
//           }
//         />
//         <textarea
//           placeholder="Asset description"
//           className="mt-2 border rounded p-4"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, description: e.target.value })
//           }
//         />
//         <input
//           placeholder="Asset Price in Eth"
//           className="mt-8 border rounded p-4"
//           type="number"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, price: e.target.value })
//           }
//         />
//         <input type="file" name="Asset" className="my-4" onChange={onChange} />
//         {fileUrl && (
//           <Image
//             src={fileUrl}
//             alt="Picture of the author"
//             className="rounded mt-4"
//             width={350}
//             height={500}
//             // blurDataURL="data:..." automatically provided
//             // placeholder="blur" // Optional blur-up while loading
//           />
//         )}
//         <button
//           onClick={createItem}
//           className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
//         >
//           Create NFT
//         </button>
//       </div>
//     </div>
//   );
// }
// ------------------------------------------------------------------------------------------------------

// import { useState } from "react";
// import { create as ipfsHttpClient } from "ipfs-http-client";

// const projectId = '2UjpdOTY76z1OoqeVwONqJbFdVt';
// const projectSecretKey = 'ccf6feb9411e2ec493347692cdb47c95';
// const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
// import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
// import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
// import { EtherscanProvider } from '@ethersproject/providers'

// function CreateItem() {
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [fileUrl, setFileUrl] = useState(null)

//   const ipfs = ipfsHttpClient({
//     url: "https://ipfs.infura.io:5001/api/v0",
//     headers: {
//       authorization,
//     },
//   });
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const files = form[0].files;

//     if (!files || files.length === 0) {
//       return alert("No files selected");
//     }

//     const file = files[0];
//     // upload files
//     const result = await ipfs.add(file);

//     setUploadedImages([
//       ...uploadedImages,
//       {
//         cid: result.cid,
//         path: result.path,
//       },
//     ]);
//     const url = result.path;
//     setFileUrl(url);
//     form.reset();
//   };
//   async function createItem(){
//     const {name, description, price} = formInput; //get the value from the form input

//     //form validation
//     if(!name || !description || !price || !fileUrl) {
//         return
//     }

//     const data = JSON.stringify({
//         name, description, image: fileUrl
//     });

//     try{
//         const added = await client.add(data)
//         const url = `https://ipfs.infura.io/ipfs/${added.path}`
//         //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
//         createSale(url)
//     }catch(error){
//         console.log(`Error uploading file: `, error)
//     }
// }
// async function createSale(url){
//   const web3Modal = new Web3Modal();
//   const connection = await web3Modal.connect();
//   const provider = new ethers.providers.Web3Provider(connection);

//   //sign the transaction
//   const signer = provider.getSigner();
//   let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
//   let transaction = await contract.createToken(url);
//   let tx = await transaction.wait()

//   //get the tokenId from the transaction that occured above
//   //there events array that is returned, the first item from that event
//   //is the event, third item is the token id.
//   console.log('Transaction: ',tx)
//   console.log('Transaction events: ',tx.events[0])
//   let event = tx.events[0]
//   let value = event.args[2]
//   let tokenId = value.toNumber() //we need to convert it a number

//   //get a reference to the price entered in the form
//   const price = ethers.utils.parseUnits(formInput.price, 'ether')

//   contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

//   //get the listing price
//   let listingPrice = await contract.getListingPrice()
//   listingPrice = listingPrice.toString()

//   transaction = await contract.createMarketItem(
//       nftaddress, tokenId, price, {value: listingPrice }
//   )

//   await transaction.wait()

//   router.push('/')

// }

//   return (
//     <div className="CreateItem">

//     </div>
//   );
// }

// export default CreateItem;

// ==================================================================================================
import {useState } from 'react'
import {ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'



const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);


import { nftaddress, nftmarketaddress } from "../config";
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import { EtherscanProvider } from '@ethersproject/providers'
import Image from 'next/image'

function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState([]);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const onChange = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setUploadedImages([
      ...uploadedImages,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);
    const url1 = "https://skywalker.infura-ipfs.io/ipfs/" + result.path;
    console.log(url1);
    setFileUrl(url1);
  };

  async function createItem() {
    const { name, description, price } = formInput; //get the value from the form input

    //form validation
    if (!name || !description || !price || !fileUrl) {
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await ipfs.add(data);
      const url = "https://skywalker.infura-ipfs.io/ipfs/" + added.path;
      //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
      createSale(url);
    } catch (error) {
      console.log(`Error uploading file: `, error);
    }
  }

  //2. List item for sale
  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign the transaction
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();

    //get the tokenId from the transaction that occured above
    //there events array that is returned, the first item from that event
    //is the event, third item is the token id.
    console.log("Transaction: ", tx);
    console.log("Transaction events: ", tx.events[0]);
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber(); //we need to convert it a number

    //get a reference to the price entered in the form
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    //get the listing price
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-8 border rounded p-4"
          type="number"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        {ipfs ? (
          <input
            id="file-upload"
            type="file"
            name="file"
            onChange={onChange} // Use onChange here
          />
        ) : null}
        {fileUrl && (
          <Image
            src={fileUrl}
            alt="Picture of the author"
            className="rounded mt-4"
            width={350}
            height={500}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        )}
        <button
          onClick={createItem}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}

export default CreateItem;
