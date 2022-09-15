import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAgent } from 'src/features/auth'
import List from 'src/features/app/components/pages/agent/mk/SessionEntries/TotalBetForEachChild'

export default function MkAgentTotalBetForEachChildPage() {
  return (
    <ProtectRouteAgent>
      <LayoutDash>
        <Head>
          <title>Mk - Users Total Bet</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAgent>
  );
};

