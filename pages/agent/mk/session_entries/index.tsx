import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAgent } from 'src/features/auth'
import List from 'src/features/app/components/pages/agent/mk/SessionEntries'

export default function AgentMkSessionEntriesPage() {
  return (
    <ProtectRouteAgent>
      <LayoutDash>
        <Head>
          <title>Mk - Session Entriess</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAgent>
  );
};

