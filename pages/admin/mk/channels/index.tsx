import Head from "next/head";
import Layout from "src/features/app/components/layout/LayoutAdmin";
import { ProtectRouteAdmin } from 'src/features/auth'
import List from 'src/features/app/components/pages/admin/mk/Channels'

export default function AdminMkSessionPage() {
  return (
    <ProtectRouteAdmin>
      <Layout>
        <Head>
          <title>Mk - Channels</title>
        </Head>
        <List />
      </Layout>
    </ProtectRouteAdmin>
  );
};

