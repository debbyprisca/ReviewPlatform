
import { useState , useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WalletButton = ({ fullWidth = true, onClick }) => {

  useEffect(()=>{

      
    })

  const { login, isLoading } = useAuth();

  
  const handleConnect = async () => {
    try {
      if(typeof(window.ethereum) !== 'undefined'){
          const Accounts = await window.ethereum.request({method:'eth_requestAccounts'})
          console.log(Accounts)
          if(Accounts){
            const Btn = document.getElementById('Connect')
            Btn.innerHTML = "Disconnect"
            Btn.onClick = ()=>{
              window.ethereum.request({method:'wallet_revokePermissions',params:[{eth_Accounts:{}}]})
              Btn.innerHTML = "Connect";
              Btn.onClick= handleConnect}
          }
      }
      // await login();
      // if (onClick) onClick();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };
  
  return (
    
    <button
    id="Connect"  
    onClick={handleConnect}
      disabled={isLoading}
      className={`btn btn-primary flex items-center justify-center transition-all duration-300 ${
        fullWidth ? 'w-full' : ''
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <Wallet className="w-4 h-4 mr-2" />
      )}
      <span>Connect Wallet</span>
    </button>
  );
};

export default WalletButton;