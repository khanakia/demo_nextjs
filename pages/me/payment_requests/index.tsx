import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/Me/PaymentRequests'

const MePaymentRequests = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>My Withdrawals</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default MePaymentRequests