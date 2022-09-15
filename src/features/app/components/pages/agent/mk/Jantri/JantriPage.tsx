import React from "react";
import { useRouter } from "next/router";
import { SimpleLoader } from "src/features/bite/components";
import { useSetState } from "src/features/bite";
import JantriTable from "src/features/app/components/pages/admin/mk/Jantri/JantriTable"
import FilterForm from "./FilterForm";
import { useQueryMkAgentJantri } from "src/features/app";

export default function Jantry() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useSetState({
    sessionId: "",
    userPhone: "",
  });

  const { data, isLoading } = useQueryMkAgentJantri({
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
      <JantriTable items={data} />
    </>
  );
}
