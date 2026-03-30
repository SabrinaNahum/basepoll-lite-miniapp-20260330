"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

export function WalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Wallet not connected";
  const isWrongChain = isConnected && chainId !== base.id;

  return (
    <div className="wallet-area">
      <p>{shortAddress}</p>
      {!isConnected ? (
        <button
          type="button"
          onClick={() => connect({ connector: connectors[0] })}
          disabled={isConnecting}
          className="wallet-btn"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : isWrongChain ? (
        <button
          type="button"
          onClick={() => switchChainAsync({ chainId: base.id })}
          disabled={isSwitching}
          className="wallet-btn"
        >
          {isSwitching ? "Switching..." : "Switch To Base"}
        </button>
      ) : (
        <button type="button" onClick={() => disconnect()} className="wallet-btn">
          Disconnect
        </button>
      )}
    </div>
  );
}
