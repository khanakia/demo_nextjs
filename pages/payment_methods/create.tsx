import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Create from 'src/features/app/components/pages/PaymentMethods/Create'

const PaymentMethodCreate = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Payment Method</title>
        </Head>
        <Create />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default PaymentMethodCreate