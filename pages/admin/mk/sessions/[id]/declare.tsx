import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdmin } from 'src/features/auth'
import Form1 from 'src/features/app/components/pages/admin/mk/Sessions/DeclareSessionForm'

export default function AdminMkSessionDeclarePage() {
  return (
    <ProtectRouteAdmin>
      <LayoutDash>
        <Head>
          <title>MK - Declare Session</title>
        </Head>
        <Form1 />
      </LayoutDash>
    </ProtectRouteAdmin>
  );
};