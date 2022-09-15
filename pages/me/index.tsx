import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRoute } from 'src/features/auth'
import Me from 'src/features/app/components/pages/Me/Me'

const MeInfoPage = () => {
  return (
    <ProtectRoute>
      <LayoutDash>
        <Head>
          <title>My Detail</title>
        </Head>
        <Me />
      </LayoutDash>
    </ProtectRoute>
  );
};

export default MeInfoPage