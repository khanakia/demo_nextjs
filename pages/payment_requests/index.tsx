import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/PaymentRequests/ByChilds'

const PaymentRequests = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Payment Requests By Users</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default PaymentRequests