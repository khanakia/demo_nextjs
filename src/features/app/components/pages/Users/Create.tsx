import React from "react";
import { useRouter } from "next/router";
import FormNew from './FormNew'

export default function PaymentMethodEdit() {
  const router = useRouter();
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(`/`)
  }

  return (
    <>
      <h5>User</h5>
      <FormNew onSubmit={handleSubmit} />
    </>
  );
}
