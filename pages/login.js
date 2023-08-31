import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter(); // Initialize useRouter
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
              const address = res.publicKey.toString();
              localStorage.setItem('walletAddress', address);
              setIsConnected(true);
              router.push('/'); // Redirect to home page
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
            router.push('/'); // Redirect to home page
          }
        } catch (error) {
          console.error(error);
          alert('Failed to connect Phantom Wallet.');
        }
      };
    


      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Connect to Phantom Wallet</h1>
          <button style={{ backgroundColor: 'violet', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={connectWallet}>
            Connect Wallet
          </button>
          {isConnected && <p>Connected</p>}
        </div>
      );
    }
    

export default Login;
