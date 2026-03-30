"use client";

import { useEffect, useMemo } from "react";
import { useBlockNumber, useReadContract } from "wagmi";
import { basePollLiteContract } from "@/lib/contracts";

export function usePollResult() {
  const readResult = useReadContract({
    ...basePollLiteContract,
    functionName: "result",
    query: {
      staleTime: 3_000
    }
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    if (blockNumber) {
      void readResult.refetch();
    }
  }, [blockNumber, readResult]);

  const values = useMemo(() => {
    const optionA = readResult.data?.[0] ?? 0n;
    const optionB = readResult.data?.[1] ?? 0n;
    const total = optionA + optionB;
    const optionAPercentage =
      total === 0n ? 0 : Number((optionA * 10000n) / total) / 100;
    const optionBPercentage =
      total === 0n ? 0 : Number((optionB * 10000n) / total) / 100;

    return {
      optionA,
      optionB,
      total,
      optionAPercentage,
      optionBPercentage
    };
  }, [readResult.data]);

  return {
    ...values,
    isLoading: readResult.isLoading,
    isFetching: readResult.isFetching,
    refetch: readResult.refetch
  };
}
