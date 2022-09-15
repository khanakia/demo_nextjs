import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/SessionEntries/TotalBetForEachChild'

export default function MkAdminTotalBetForEachChildPage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>Mk - Users Total Bet</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};

