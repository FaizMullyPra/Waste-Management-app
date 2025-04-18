// 'use client'

// import { useState ,useEffect} from "react";
// import Link from "next/link";
// import {usePathname} from "next/navigation";
// import {Button} from "@/components/ui/button";
// import {Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from "lucide-react";

// import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "./ui/dropdown-menu";
// import {Badge} from "@/components/ui/badge";
// import {Web3Auth} from "@web3auth/modal";
// import {CHAIN_NAMESPACES, IProvider,WEB3AUTH_NETWORK} from "@web3auth/base";
// import {EthereumPrivateKeyProvider} from "@web3auth/ethereum-provider";
// import {createUser , getUserByEmail} from "@/utils/db/actions";

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


// // const privateKeyProvider = new EthereumPrivateKeyProvider({
//   config : chainConfig
// // })
// const privateKeyProvider = new EthereumPrivateKeyProvider(chainConfig);

// const web3Auth = new Web3Auth({
//   clientId,
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
//       const init = async () => {
//           try {
//               await web3Auth.initModal();
//               setProvider(web3Auth.provider);
  
//               if (web3Auth.connected) {
//                   setLoggedIn(true);
//                   const user = await web3Auth.getUserInfo();
//                   setUserInfo(user);
  
//                   if (user.email) {
//                       localStorage.setItem('userEmail', user.email);
//                       try {
//                           await createUser(user.email, user.name || 'Anonymous User');
//                       } catch (error) {
//                           console.error("Error creating user:", error);
//                       }
//                   }
//               }
//           } catch (error) {
//               console.error("Web3Auth init error:", error);
//           } finally {
//               setLoading(false);
//           }
//         } init()
//       },[]) ;

//       useEffect(()=>{
//             const fetchNotifications = async () => {
//               if(userInfo && userInfo.email){
//                 const user = await getUserByEmail(userInfo.email);
//               }
//             }
//       })
  
// }

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Coins, Leaf, Search, Bell, User, ChevronDown, LogIn, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { createUser, getUserByEmail } from "@/utils/db/actions";

// Web3Auth client ID from environment
const clientId = process.env.WEB3_AUTH_CLIENT_ID!;

// Chain configuration for Sepolia Testnet
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7", // Sepolia Testnet
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: 'Sepolia Testnet',
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum',
  logo: 'https://assets.web3auth.io/evm-chains/sepolia.png',
};

// Web3Auth setup
const privateKeyProvider = new EthereumPrivateKeyProvider(chainConfig);
const web3Auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
});

// Header component props interface
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
  const [notification, setNotification] = useState<any[]>([]); // Assuming you will fetch notifications
  const [balance, setBalance] = useState<number>(0);

  // Initialize Web3Auth and handle user login
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize Web3Auth
        await web3Auth.initModal();
        setProvider(web3Auth.provider);

        if (web3Auth.connected) {
          setLoggedIn(true);
          const user = await web3Auth.getUserInfo();
          setUserInfo(user);

          if (user.email) {
            localStorage.setItem('userEmail', user.email);
            try {
              await createUser(user.email, user.name || 'Anonymous User');
            } catch (error) {
              console.error("Error creating user:", error);
            }
          }
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Fetch notifications based on the user's email
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userInfo && userInfo.email) {
        try {
          const user = await getUserByEmail(userInfo.email);
          // Assuming notifications are part of the user object
          setNotification(user?.notifications || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [userInfo]); // Only runs when userInfo changes

  return (
    <div>
      {/* Add your header UI here */}
      {/* You can now use `loggedIn`, `userInfo`, `notification`, and `balance` in your UI */}
    </div>
  );
}
