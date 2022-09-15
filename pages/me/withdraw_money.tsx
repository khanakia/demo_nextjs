import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import WithdrawMoney from 'src/features/app/components/pages/Me/WithdrawMoney'

const MeWithdrawPage = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Withdraw Money</title>
        </Head>
        <WithdrawMoney />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default MeWithdrawPage