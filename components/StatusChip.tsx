type StatusChipProps = {
  status: "not-voted" | "already-voted" | "submitting";
};

const statusMap: Record<StatusChipProps["status"], string> = {
  "not-voted": "Not voted yet",
  "already-voted": "Already voted",
  submitting: "Submitting..."
};

export function StatusChip({ status }: StatusChipProps) {
  return <p className={`status-chip ${status}`}>{statusMap[status]}</p>;
}
