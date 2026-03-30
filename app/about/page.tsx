import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { PollHeader } from "@/components/PollHeader";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="page">
      <PollHeader
        title="About BasePoll Lite"
        subtitle="Simple rules, real onchain voting"
      />

      <section className="card">
        <p className="section-title">Rules</p>
        <RuleList />
      </section>

      <Link href="/" className="back-link">
        Go To Vote
      </Link>

      <BottomNav />
    </main>
  );
}
