import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Edit from 'src/features/app/components/pages/PaymentMethods/Edit'

const PaymentMethodEdit = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Payment Method</title>
        </Head>
        <Edit />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default PaymentMethodEdit