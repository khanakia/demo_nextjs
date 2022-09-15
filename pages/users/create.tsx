import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdminAndAgent } from 'src/features/auth'
import Create from 'src/features/app/components/pages/Users/Create'

const UserCreate = () => {
  return (
    <ProtectRouteAdminAndAgent>
      <LayoutDash>
        <Head>
          <title>User</title>
        </Head>
        <Create />
      </LayoutDash>
    </ProtectRouteAdminAndAgent>
  );
};

export default UserCreate