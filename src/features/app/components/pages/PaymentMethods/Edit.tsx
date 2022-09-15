import React from "react";
import { useRouter } from "next/router";
import { useQueryPaymentMethod } from "src/features/app";
import FormNew from './FormNew'
import { SimpleLoader } from "src/features/bite/components"

export default function PaymentMethodEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQueryPaymentMethod({id: id as any});
  
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(`/payment_methods`)
  }

  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <h5>Payment Method</h5>
      <FormNew data={data} id={id as any} onSubmit={handleSubmit} />
    </>
  );
}
