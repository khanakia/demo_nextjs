import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import Create from 'src/features/app/components/pages/admin/mk/Sessions/Create'

export default function AdminMkSessionCreatePage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>Mk - Create Session</title>
        </Head>
        <Create />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};