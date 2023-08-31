import React, { useState, useEffect } from "react";

function Wallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };
  useEffect(() => {
    const connectToWallet = async () => {
      const provider = getProvider();
      provider
        ?.connect({ onlyIfTrusted: true })
        .then((res) => {
          // console.log(res.publicKey.toString());
          const address = res.publicKey.toString();
          localStorage.setItem("walletAddress", address);
          setIsConnected(true);
          setWalletAddress(address);
        })
        .catch((err) => {
          return err;
        });
    };
    window.addEventListener("load", connectToWallet);
    return () => {
      window.removeEventListener("load", connectToWallet);
    };
  }, []);

  const connectWallet = async () => {
    if (!window.solana) {
      alert('Phantom Wallet not found! Please install it.');
      return;
    }

    try {
      const publicKey = await window.solana.connect();
      if (publicKey) {
        const address = publicKey.publicKey.toString();
        localStorage.setItem('walletAddress', address);
        setIsConnected(true);
        // setWalletAddress(address);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect Phantom Wallet.');
    }
  };

  return (
    <div>
      <h1>{isConnected ? `Wallet Address: ${walletAddress}` : "Not Connected"}</h1>
      {!isConnected && <button onClick={connectWallet}>Connect Wallet</button>}
    </div>
  );
}

export default Wallet;
