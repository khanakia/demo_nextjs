import Head from "next/head";
import Layout from "src/features/app/components/layout/LayoutAdmin";
import { ProtectRouteAdmin } from 'src/features/auth'
import Create from 'src/features/app/components/pages/admin/mk/Channels/Create'

export default function AdminMkChannelCreatePage() {
  return (
    <ProtectRouteAdmin>
      <Layout>
        <Head>
          <title>Mk - Create Channel</title>
        </Head>
        <Create />
      </Layout>
    </ProtectRouteAdmin>
  );
};