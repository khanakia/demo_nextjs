import Head from "next/head";
import LayoutDash from "src/features/app/components/layout/LayoutDash";
import { ProtectRouteAdminAndAgent } from 'src/features/auth'
import Edit from 'src/features/app/components/pages/Users/Edit'

const UserEdit = () => {
  return (
    <ProtectRouteAdminAndAgent>
      <LayoutDash>
        <Head>
          <title>User</title>
        </Head>
        <Edit />
      </LayoutDash>
    </ProtectRouteAdminAndAgent>
  );
};

export default UserEdit