const rules = [
  "Each wallet address can vote only once.",
  "Every vote is an onchain transaction on Base.",
  "Result data is read directly from the contract.",
  "This app is a lightweight Base Mini App sample."
];

export function RuleList() {
  return (
    <ul className="rule-list">
      {rules.map((rule) => (
        <li key={rule}>{rule}</li>
      ))}
    </ul>
  );
}
