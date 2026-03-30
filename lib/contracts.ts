import type { Address } from "viem";
import { basePollLiteAbi } from "@/lib/abi/basePollLiteAbi";

export const BASEPOLLLITE_CONTRACT_ADDRESS_PLACEHOLDER =
  "BASEPOLLLITE_CONTRACT_ADDRESS_PLACEHOLDER";

export const BASEPOLLLITE_CONTRACT_ADDRESS: Address =
  "0x95335f97cf526199c64103821f2669c810715c05";

export const basePollLiteContract = {
  address: BASEPOLLLITE_CONTRACT_ADDRESS,
  abi: basePollLiteAbi
} as const;
