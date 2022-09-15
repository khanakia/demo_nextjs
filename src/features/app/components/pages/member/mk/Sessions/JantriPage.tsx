import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SimpleLoader } from "src/features/bite/components";
import { useSetState } from "src/features/bite";
import JantriTable from "src/features/app/components/pages/admin/mk/Jantri/JantriTable"
import { useQueryMkJantri } from "src/features/app";

export default function Jantry() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useSetState({
    sessionId: id as any,
  });

  // console.log(state, id)

  const { data, isLoading } = useQueryMkJantri({
    input: state,
  });

  // console.log(data);

  useEffect(() => {
    setState({
      sessionId: id as any,
    })
  }, [id])


  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <JantriTable items={data} />
    </>
  );
}
