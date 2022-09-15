import React from "react";
import { useRouter } from "next/router";
import { userQueryMe } from "src/features/app";

import { SimpleLoader } from "src/features/bite/components"

export default function PaymentMethodEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = userQueryMe();
  
  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <h5>My Profile</h5>
      <table className='table bg-white mt-3'>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{data?.id}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{data?.phone}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{data?.createdAt}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{data?.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{data?.roleId}</td>
          </tr>
          <tr>
            <th>Parent Id</th>
            <td>{data?.parentId}</td>
          </tr>
          <tr>
            <th>Referral Id</th>
            <td>{data?.referralId}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{data?.status}</td>
          </tr>
          <tr>
            <th>Min Bet</th>
            <td>{data?.minBet}</td>
          </tr>
          <tr>
            <th>Max Bet</th>
            <td>{data?.maxBet}</td>
          </tr>
          <tr>
            <th>Rate</th>
            <td>{data?.rate}</td>
          </tr>
          <tr>
            <th>Bet Comm.</th>
            <td>{data?.betComm}</td>
          </tr>
          <tr>
            <th>Patti</th>
            <td>{data?.patti}</td>
          </tr>
          <tr>
            <th>Parent Name</th>
            <td>{data?.parentName}</td>
          </tr>
          <tr>
            <th>Parent Phone</th>
            <td>{data?.parentPhone}</td>
          </tr>
          <tr>
            <th>Referral Name</th>
            <td>{data?.referralName}</td>
          </tr>
          <tr>
            <th>Referral Phone</th>
            <td>{data?.referralPhone}</td>
          </tr>
        </tbody>
      </table>
      
    </>
  );
}
