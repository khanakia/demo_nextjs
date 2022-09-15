import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/SessionEntries'

export default function AdminMkSessionEntriesPage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>Mk - Session Entriess</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};

