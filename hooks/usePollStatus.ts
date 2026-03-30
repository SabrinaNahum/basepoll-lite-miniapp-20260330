"use client";

import type { Address } from "viem";
import { zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import { basePollLiteContract } from "@/lib/contracts";

export function usePollStatus(address?: Address) {
  const result = useReadContract({
    ...basePollLiteContract,
    functionName: "voted",
    args: [address ?? zeroAddress],
    query: {
      enabled: Boolean(address),
      staleTime: 3_000
    }
  });

  return {
    hasVoted: Boolean(result.data),
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    refetch: result.refetch
  };
}
