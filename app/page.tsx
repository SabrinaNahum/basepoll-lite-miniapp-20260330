"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";
import { BottomNav } from "@/components/BottomNav";
import { PollHeader } from "@/components/PollHeader";
import { StatusChip } from "@/components/StatusChip";
import { VotePanel } from "@/components/VotePanel";
import { WalletButton } from "@/components/WalletButton";
import { usePollResult } from "@/hooks/usePollResult";
import { usePollStatus } from "@/hooks/usePollStatus";
import { useTrackedVote } from "@/hooks/useTrackedVote";

function friendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/voted/i.test(message)) return "Already voted";
  if (/user rejected|rejected/i.test(message)) return "Transaction cancelled";
  return "Vote failed, please try again";
}

export default function VotePage() {
  const router = useRouter();
  const { address, isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { optionA, optionB, refetch: refetchResult } = usePollResult();
  const { hasVoted, refetch: refetchStatus } = usePollStatus(address);
  const { voteTracked, isPending } = useTrackedVote();

  const [feedback, setFeedback] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const status = useMemo(() => {
    if (isPending) return "submitting" as const;
    if (hasVoted) return "already-voted" as const;
    return "not-voted" as const;
  }, [hasVoted, isPending]);

  const voteDisabled =
    !isConnected || !address || hasVoted || isPending || chainId !== base.id;

  const handleVote = async (chooseA: boolean) => {
    if (!isConnected || !address) {
      setFeedback("Connect wallet first");
      return;
    }

    try {
      setFeedback("");
      if (chainId !== base.id) {
        await switchChainAsync({ chainId: base.id });
      }

      const hash = await voteTracked(chooseA, address);
      setTxHash(hash);
      localStorage.setItem("basepoll:lastChoice", chooseA ? "A" : "B");
      localStorage.setItem("basepoll:lastTxHash", hash);
      await Promise.all([refetchStatus(), refetchResult()]);
      router.push("/result");
    } catch (error) {
      setFeedback(friendlyError(error));
    }
  };

  return (
    <main className="page">
      <PollHeader
        title="Choose A or B in one tap"
        subtitle="A minimal split-decision board on Base"
      />

      <section className="card">
        <div className="row-between">
          <p className="question">Which side wins this round?</p>
          <StatusChip status={status} />
        </div>

        <div className="vote-stack">
          <VotePanel
            option="A"
            title="Vote A"
            description={`Current votes: ${optionA.toString()}`}
            disabled={voteDisabled}
            onVote={() => handleVote(true)}
          />
          <VotePanel
            option="B"
            title="Vote B"
            description={`Current votes: ${optionB.toString()}`}
            disabled={voteDisabled}
            onVote={() => handleVote(false)}
          />
        </div>

        {txHash ? (
          <p className="hint">
            Tx Hash: <span className="mono">{txHash}</span>
          </p>
        ) : null}
        {feedback ? <p className="error">{feedback}</p> : null}
      </section>

      <section className="card">
        <p className="section-title">Wallet</p>
        <WalletButton />
      </section>

      <BottomNav />
    </main>
  );
}
