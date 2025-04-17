// 'use-client'

// import { useState ,useEffect} from "react";
// import Link from "next/link";
// import {usePathname} from "next/navigation";
// import {Button} from "@/components/ui/button";
// import {Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from "lucide-react";

// import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
// import {Badge} from "@/components/ui/badge";
// import {Web3Auth} from "@web3auth/modal";
// import {CHAIN_NAMESPACES, IProvider,WEB3AUTH_NETWORK} from "@web3auth/base";
// import {EthereumPrivateKeyProvider} from "@web3auth/ethereum-provider";

// const clientId = process.env.WEB3_AUTH_CLIENT_ID
// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0xaa36a7", // Ethereum Mainnet
//   rpcTarget: "https://rpc.ankr.com/eth_sepolia",
//   displayName : 'Sepolia Testnet', // RPC URL
//   blockExplorerUrl: 'https://sepolia.etherscan.io',
//     ticker: 'ETH',
//     tickerName: 'Ethereum',
//     logo : 'https://assets.web3auth.io/evm-chains/sepolia.png',
// }


// const privateKeyProvider = new EthereumPrivateKeyProvider({
//   config : chainConfig
// })
// const web3Auth = new Web3Auth({
//     clientId,
//   web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
//   privateKeyProvider
// });

// interface HeaderProps {
//     onMenuClick: () => void;
//     totalEarnings: number;
// }

// export default function Header({onMenuClick, totalEarnings}: HeaderProps) {
//     const [provider, setProvider] = useState<IProvider | null>(null);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [userInfo, setUserInfo] = useState<any>(null);
//     const pathname = usePathname();
//     const [notification, setNotification] = useState<Notification[]>([]);
//     const [balance, setBalance] = useState(0);

//     useEffect(() => {
//         const init = async () => {
//              try{
//                  await web3Auth.initModal();
//                  setProvider(web3Auth.provider);

//                  if(web3Auth.connected){
//                         const user = await web3Auth.getUserInfo();
//                         setUserInfo(user);
//                         if(user.email){
//                             localStorage.setItem('userEmail', user.email);
//                             await createUser(user.email, user.name || 'Anonymous User');
//                          }
//                  }

                 
//              }catch(error){

//              }
//         }
//     })
// }

'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Coins,
  Leaf,
  Search,
  Bell,
  User,
  ChevronDown,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Web3Auth } from "@web3auth/modal";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!;
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://assets.web3auth.io/evm-chains/sepolia.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: chainConfig });

const web3Auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
});

interface HeaderProps {
  onMenuClick: () => void;
  totalEarnings: number;
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const pathname = usePathname();
  const [notification, setNotification] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        await web3Auth.initModal();
        setProvider(web3Auth.provider);

        if (web3Auth.connected) {
          const user = await web3Auth.getUserInfo();
          setUserInfo(user);
          if (user.email) {
            localStorage.setItem("userEmail", user.email);
            // Uncomment if you have this defined
            // await createUser(user.email, user.name || "Anonymous User");
          }
        }
      } catch (error) {
        console.error("Web3Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);
  
  // More UI/logic coming here...
}
