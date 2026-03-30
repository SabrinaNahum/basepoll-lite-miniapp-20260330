type PollHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PollHeader({ title, subtitle }: PollHeaderProps) {
  return (
    <header className="poll-header">
      <p className="brand">BasePoll Lite</p>
      <h1>{title}</h1>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </header>
  );
}
