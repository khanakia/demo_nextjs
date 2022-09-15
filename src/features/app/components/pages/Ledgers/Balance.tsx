import { useQueryLedgerBalance } from "src/features/app";

export default function LedgerBalance() {
  const { data } = useQueryLedgerBalance();
  return (
    <>
      <span className="me-3 fs-5">
        Balance: <span className="badge bg-dark">{data}</span>
      </span>
    </>
  );
}
