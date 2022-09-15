import React from "react";
import { useRouter } from "next/router";
import { SimpleLoader } from "src/features/bite/components";
import { useSetState } from "src/features/bite";
import { useQueryMkAdminJantri } from "src/features/app";
import FilterForm from "./FilterForm";
import JantriTable from "./JantriTable"

export default function Jantry() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useSetState({
    sessionId: "",
    parentPhone: "",
  });

  const { data, isLoading } = useQueryMkAdminJantri({
    input: state,
  });

  console.log(data);

  const handleSubmitForm = (values: any) => {
    setState(values);
  };

  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <FilterForm onSubmit={handleSubmitForm} />
      <JantriTable items={data} fieldTotalBet="adminTotalBet" />
    </>
  );
}
