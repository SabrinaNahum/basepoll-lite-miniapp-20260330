type VotePanelProps = {
  option: "A" | "B";
  title: string;
  description: string;
  disabled?: boolean;
  onVote: () => void;
};

export function VotePanel({
  option,
  title,
  description,
  disabled = false,
  onVote
}: VotePanelProps) {
  return (
    <button
      type="button"
      className={`vote-panel ${option === "A" ? "option-a" : "option-b"}`}
      onClick={onVote}
      disabled={disabled}
      aria-label={`Vote ${option}`}
    >
      <span className="option-tag">Vote {option}</span>
      <strong>{title}</strong>
      <span>{description}</span>
    </button>
  );
}
