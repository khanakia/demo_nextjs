import React from "react";
import { SessionStatusMeta } from "./constant";

type Props = {
  statusId?: string;
};

export default function StatusBadge(props: Props) {
  const { statusId } = props;

  return (
    <>
      <span className="badge bg-primary">{statusId}</span>
    </>
  );
}
