import React from "react";
import { useRouter } from "next/router";
import { useQueryMkAdmChannel } from "src/features/app";
import FormNew from './FormNew'
import { SimpleLoader } from "src/features/bite/components"
import { listPageLink, titleSingular } from "./constant"
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQueryMkAdmChannel({id: id as any});
  
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(listPageLink)
  }

  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <h5>{titleSingular}</h5>
      <FormNew data={data} id={id as any} onSubmit={handleSubmit} />
    </>
  );
}
