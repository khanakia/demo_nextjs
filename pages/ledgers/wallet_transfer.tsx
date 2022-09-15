import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import { RoleWrapperAdminAgent } from "src/features/auth/components/other/RoleWrapper"
import WalletTransfer from 'src/features/app/components/pages/Ledgers/WalletTransfer'

const WalletTransferPage = () => {
  return (
    <ProtectRoute>
      <RoleWrapperAdminAgent>
        <LayoutDash>
          <Head>
            <title>Wallet Transfer</title>
          </Head>
          <WalletTransfer />
        </LayoutDash>
      </RoleWrapperAdminAgent>
    </ProtectRoute>
  );
};

export default WalletTransferPage