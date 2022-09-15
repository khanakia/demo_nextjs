import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import List from 'src/features/app/components/pages/Ledgers'

const LedgersPage = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>Ledgers</title>
        </Head>
        <List />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default LedgersPage