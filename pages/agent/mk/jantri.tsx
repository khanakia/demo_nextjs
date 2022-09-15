import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAgent } from 'src/features/auth'
import Jantri from 'src/features/app/components/pages/agent/mk/Jantri/JantriPage'

export default function AgentJantriPage() {
  return (
    <ProtectRouteAgent>
      <LayoutDash>
        <Head>
          <title>MK - Jantri Session</title>
        </Head>
        <Jantri />
      </LayoutDash>
    </ProtectRouteAgent>
  );
};