import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import Edit from 'src/features/app/components/pages/admin/mk/Sessions/Edit'

export default function AdminMkSessionEditPage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>MK - Edit Session</title>
        </Head>
        <Edit />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};