type ResultBarProps = {
  optionA: bigint;
  optionB: bigint;
};

export function ResultBar({ optionA, optionB }: ResultBarProps) {
  const total = optionA + optionB;
  const aPercent = total === 0n ? 50 : Number((optionA * 10000n) / total) / 100;
  const bPercent = total === 0n ? 50 : Number((optionB * 10000n) / total) / 100;

  return (
    <div className="result-wrap">
      <div className="result-head">
        <p>
          A <strong>{optionA.toString()}</strong>
        </p>
        <p>
          B <strong>{optionB.toString()}</strong>
        </p>
      </div>
      <div className="result-bar" role="img" aria-label="Vote comparison bar">
        <div className="segment-a" style={{ width: `${aPercent}%` }} />
        <div className="segment-b" style={{ width: `${bPercent}%` }} />
      </div>
      <div className="result-foot">
        <p>{aPercent.toFixed(2)}%</p>
        <p>{bPercent.toFixed(2)}%</p>
      </div>
    </div>
  );
}
