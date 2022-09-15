import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/Sessions'

export default function AdminMkSessionPage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>Mk - Sessions</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};

