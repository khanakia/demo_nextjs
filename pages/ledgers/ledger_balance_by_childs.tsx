import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdminAndAgent } from 'src/features/auth'
import List from 'src/features/app/components/pages/Ledgers/LedgerBalanceByChilds'

export default function AdminLedgerBalanceByChilds() {
  return (
    <ProtectRouteAdminAndAgent>
      <LayoutDash>
        <Head>
          <title>Mk - Users Ledger Balance</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAdminAndAgent>
  );
};

