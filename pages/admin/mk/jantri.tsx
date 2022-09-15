import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import Jantri from 'src/features/app/components/pages/admin/mk/Jantri/JantriPage'

export default function AdminJantriPage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>MK - Jantri Session</title>
        </Head>
        <Jantri />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};