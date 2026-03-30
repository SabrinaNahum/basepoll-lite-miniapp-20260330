"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { PollHeader } from "@/components/PollHeader";
import { ResultBar } from "@/components/ResultBar";
import { StatusChip } from "@/components/StatusChip";
import { usePollResult } from "@/hooks/usePollResult";
import { usePollStatus } from "@/hooks/usePollStatus";

export default function ResultPage() {
  const { address } = useAccount();
  const { optionA, optionB, total, optionAPercentage, optionBPercentage } =
    usePollResult();
  const { hasVoted } = usePollStatus(address);
  const [lastChoice, setLastChoice] = useState<string>("");
  const [lastTxHash, setLastTxHash] = useState<string>("");

  useEffect(() => {
    setLastChoice(localStorage.getItem("basepoll:lastChoice") ?? "");
    setLastTxHash(localStorage.getItem("basepoll:lastTxHash") ?? "");
  }, []);

  return (
    <main className="page">
      <PollHeader
        title="Live Result"
        subtitle="Onchain counts updated from Base contract"
      />

      <section className="card">
        <div className="row-between">
          <p className="section-title">Total Votes: {total.toString()}</p>
          <StatusChip status={hasVoted ? "already-voted" : "not-voted"} />
        </div>
        <ResultBar optionA={optionA} optionB={optionB} />
        <div className="result-numbers">
          <p>
            A: <strong>{optionA.toString()}</strong> ({optionAPercentage.toFixed(2)}
            %)
          </p>
          <p>
            B: <strong>{optionB.toString()}</strong> ({optionBPercentage.toFixed(2)}
            %)
          </p>
        </div>
        {lastChoice ? <p className="hint">Your last vote: {lastChoice}</p> : null}
        {lastTxHash ? (
          <p className="hint">
            Last tx: <span className="mono">{lastTxHash}</span>
          </p>
        ) : null}
      </section>

      <Link className="back-link" href="/">
        Back to Vote
      </Link>

      <BottomNav />
    </main>
  );
}
