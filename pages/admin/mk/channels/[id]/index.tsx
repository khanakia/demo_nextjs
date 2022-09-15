import Head from "next/head";
import Layout from "src/features/app/components/layout/LayoutAdmin";
import { ProtectRouteAdmin } from 'src/features/auth'
import Edit from 'src/features/app/components/pages/admin/mk/Channels/Edit'

export default function AdminMkChannelEditPage() {
  return (
    <ProtectRouteAdmin>
      <Layout>
        <Head>
          <title>MK - Edit Channel</title>
        </Head>
        <Edit />
      </Layout>
    </ProtectRouteAdmin>
  );
};