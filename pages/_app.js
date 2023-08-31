import '../styles/globals.css'
import Link from 'next/link'
import Wallet from './components/wallet'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6 flex items-center justify-between">
        <p className="text-4xl font-bold">NFT Market</p>
        <div className="flex">
          <Link href="/home">
            <a className="mr-4 text-blue-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-blue-500">Create NFT</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-blue-500">My NFT</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-blue-500">Dashboard</a>
          </Link>
        </div>
        <Wallet />
      </nav> 
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
