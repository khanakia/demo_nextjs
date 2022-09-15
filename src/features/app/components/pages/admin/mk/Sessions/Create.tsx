import React from "react";
import { useRouter } from "next/router";
import FormNew from './FormNew'
import { listPageLink, titleSingular, titlePlural } from "./constant"

export default function Create() {
  const router = useRouter();
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(listPageLink)
  }

  return (
    <>
      <h5>{titleSingular}</h5>
      <FormNew onSubmit={handleSubmit} />
    </>
  );
}
