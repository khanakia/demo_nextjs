import React from "react";
import { useRouter } from "next/router";
import FormNew from './FormNew'

export default function PaymentMethodEdit() {
  const router = useRouter();
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(`/payment_methods`)
  }

  return (
    <>
      <h5>Payment Method</h5>
      <FormNew onSubmit={handleSubmit} />
    </>
  );
}
